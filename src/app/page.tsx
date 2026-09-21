import { getPhotos } from './actions/photos'
import { getCategories } from './actions/categories'
import { getSetting } from './actions/settings'
import Menu from '@/components/Menu'
import Title from '@/components/Title'
import Presentation from '@/components/Presentation'
import Banner from '@/components/Banner'
import BannerReserve from '@/components/BannerReserve'
import HebergementAccordion from '@/components/HebergementAccordion'
import ActivitiesSection from '@/components/ActivitiesSection'
import Timeline from '@/components/Timeline'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function Home() {
  const photos = await getPhotos()
  const categories = await getCategories()
  const heroImage = await getSetting('hero_image')

  const activitiesDataRaw = await getSetting('activities_data');
  let activitiesData = undefined;
  if (activitiesDataRaw) {
    try {
      const cleanedRaw = activitiesDataRaw
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, "");
      activitiesData = JSON.parse(cleanedRaw);
    } catch (e) {
      console.warn("Erreur de parsing activitiesData sur la page d'accueil:", e);
    }
  }

  const timelineDataRaw = await getSetting('timeline_data');
  let timelineData = undefined;
  if (timelineDataRaw) {
    try {
      const cleanedRaw = timelineDataRaw
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, "");
      timelineData = JSON.parse(cleanedRaw);
    } catch (e) {
      console.warn("Erreur de parsing timelineData sur la page d'accueil:", e);
    }
  }

  return (
    <>
      <Menu />
      <main className="flex flex-col items-center justify-center">
        {heroImage && (
          <a 
            href="#presentation" 
            className="block cursor-pointer w-full flex justify-center group"
            aria-label="Découvrir le gîte"
          >
            <section
              className="rounded-4xl overflow-hidden border-5 border-primary w-[98vw] h-[calc(100dvh-103px)] flex flex-col items-center justify-center bg-cover bg-center relative transition-transform duration-700 ease-out group-hover:scale-[0.99]"
              style={{ backgroundImage: `url('${heroImage}')` }}
            >
              <div className="absolute inset-0 bg-black/40 z-0 transition-colors duration-700 group-hover:bg-black/50"></div>
              <div className="relative z-10 text-center text-white p-4">
                <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tight">LA <span className="text-secondary">REMISE.</span></h1>
                <p className="text-3xl md:text-5xl font-light italic font-tangerine">Gîte à la montagne - Montmaur, France</p>
              </div>
            </section>
          </a>
        )}

        <section className="w-full max-w-7xl mx-auto p-4 mt-8" id="presentation">
          <Title text="PRÉSENTATION" />
          <Presentation />
        </section>

        <Banner />

        <div className="w-full bg-primary relative z-10 -mt-24 pt-32 pb-10">
          <section className="w-full max-w-7xl mx-auto p-4" id="hebergement">
              <Title text="HÉBERGEMENT" />
              <HebergementAccordion categories={categories} photos={photos} />
          </section>
        </div>

        <section className="w-full max-w-7xl mx-auto p-4" id="activites">
          <Title text="ACTIVITÉS" />
          <div className="mt-4">
            <ActivitiesSection activities={activitiesData} />
            <div className="mt-16 mb-8">
              <Timeline timelineItems={timelineData} />
            </div>
          </div>
        </section>

        <BannerReserve />

        <section className="w-full max-w-7xl mx-auto p-4 mt-8" id="contact">
          <Title text="CONTACT" />
          <ContactSection />
        </section>
      </main>
      <Footer />
    </>
  )
}
