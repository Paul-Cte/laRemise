import { getCategories, createCategory, deleteCategory } from '@/app/actions/categories'
import { getPhotos, uploadPhoto, deletePhoto } from '@/app/actions/photos'
import { logout } from '@/app/actions/auth'
import { getSetting } from '@/app/actions/settings'
import UploadForm from './UploadForm'
import SubmitButton from '@/components/admin/SubmitButton'
import AdminGallery from './AdminGallery'
import HeroSettingsForm from './HeroSettingsForm'
import ContactSettingsForm from './ContactSettingsForm'
import ActivitiesSettingsForm from './ActivitiesSettingsForm'
import TimelineSettingsForm from './TimelineSettingsForm'
import Link from 'next/link'

export default async function AdminDashboard(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const currentTab = searchParams.tab || 'accueil';

  const categories = await getCategories()
  const photos = await getPhotos()
  
  // Settings
  const heroImage = await getSetting('hero_image')
  const contactPhone = await getSetting('contact_phone') || ''
  const contactEmail = await getSetting('contact_email') || ''
  
  const activitiesDataRaw = await getSetting('activities_data')
  let activitiesData = [
    { id: 'montmaur', title: 'Le chateau de Montmaur', description: "Les voyageurs aiment l'emplacement pittoresque de ce logement.", image: 'https://images.unsplash.com/photo-1549880338-65dd4bd07928?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
    { id: 'ferme', title: 'La ferme laitière', description: "Venez découvrir la traite des vaches et notre production locale dans une ambiance familiale.", image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' },
    { id: 'pic', title: 'Pic de Bure', description: "Profitez de randonnées exceptionnelles avec des panoramas à couper le souffle sur les Alpes.", image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80' }
  ];
  if (activitiesDataRaw) {
    try {
      const cleanedRaw = activitiesDataRaw
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, "");
      activitiesData = JSON.parse(cleanedRaw);
    } catch (e) {
      console.warn("Erreur de parsing activitiesData:", e);
    }
  }

  const timelineDataRaw = await getSetting('timeline_data')
  let timelineData = [
    { time: '5 min', description: 'Randonnée qui part du pied du pic de Bure', position: 'top' as const, color: 'bg-white', hasBorder: true },
    { time: '7 min', description: 'La petite promenade pleine de surprise', position: 'bottom' as const, color: 'bg-primary', hasBorder: false },
    { time: '20 min', description: 'La petite promenade pleine de surprise', position: 'top' as const, color: 'bg-secondary', hasBorder: false },
    { time: '25 min', description: 'La ville de gap avec ses petites boutiques', position: 'bottom' as const, color: 'bg-white', hasBorder: true },
    { time: '45 min', description: 'Découverte des alentours et détente', position: 'top' as const, color: 'bg-primary', hasBorder: false }
  ];
  if (timelineDataRaw) {
    try {
      const cleanedRaw = timelineDataRaw
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, "");
      timelineData = JSON.parse(cleanedRaw);
    } catch (e) {
      console.warn("Erreur de parsing timelineData:", e);
    }
  }

  const tabs = [
    { id: 'accueil', label: 'Accueil & Contact', icon: '🏠' },
    { id: 'activites', label: 'Activités & Frise', icon: '⛰️' },
    { id: 'galerie', label: 'Galerie', icon: '📸' }
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f5] pb-20 font-sans text-gray-900">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50 shadow-sm px-6 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#7e7ea8] to-[#cccce8] flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl leading-none">R</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-800">La Remise</h1>
            <p className="text-xs font-semibold text-[#7e7ea8] tracking-widest uppercase">Admin Dashboard</p>
          </div>
        </div>
        <form action={logout}>
          <button 
            type="submit" 
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-[#cccce8] transition-all duration-300"
          >
            <span className="text-sm font-semibold text-gray-600 group-hover:text-[#7e7ea8] transition-colors">Déconnexion</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-[#7e7ea8] transition-colors">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </form>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <Link 
              key={tab.id}
              href={`/admin?tab=${tab.id}`}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${currentTab === tab.id ? 'bg-[#cccce8] text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full">
          
          {/* TAB: ACCUEIL */}
          {currentTab === 'accueil' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Informations de contact */}
              <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(126,126,168,0.1)] transition-shadow duration-500 h-fit">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7e7ea8]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Informations de Contact
                </h2>
                <ContactSettingsForm phone={contactPhone} email={contactEmail} />
              </section>

              {/* Gestion Image de Fond Hero */}
              <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(126,126,168,0.1)] transition-shadow duration-500 relative overflow-hidden h-fit">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7e7ea8]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  Image Principale (Haut de page)
                </h2>
                <HeroSettingsForm currentImage={heroImage || ''} />
              </section>
            </div>
          )}

          {/* TAB: ACTIVITÉS */}
          {currentTab === 'activites' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(126,126,168,0.1)] transition-shadow duration-500">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7e7ea8]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Les 3 Activités (Images + Textes)
                </h2>
                <ActivitiesSettingsForm activitiesData={activitiesData} />
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(126,126,168,0.1)] transition-shadow duration-500">
                <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7e7ea8]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Frise Chronologique
                </h2>
                <TimelineSettingsForm timelineData={timelineData} />
              </section>
            </div>
          )}

          {/* TAB: GALERIE */}
          {currentTab === 'galerie' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Colonne Gauche */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                {/* Formulaire Upload Photo Premium */}
                <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(126,126,168,0.1)] transition-shadow duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-gradient-to-bl from-[#cccce8]/40 to-transparent blur-2xl pointer-events-none"></div>
                  <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#7e7ea8]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Ajouter une photo
                  </h2>
                  <UploadForm categories={categories} />
                </section>

                {/* Gestion des Catégories Premium */}
                <section className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                  <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#cccce8]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                    Catégories
                  </h2>
                  <form action={createCategory} className="flex gap-2 mb-6">
                    <input 
                      type="text" 
                      name="nom" 
                      placeholder="Nouvelle catégorie..." 
                      required 
                      className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e7ea8]/50 focus:border-[#7e7ea8] transition-all font-medium placeholder-gray-400"
                    />
                    <SubmitButton 
                      className="bg-[#cccce8] hover:bg-[#7e7ea8] text-gray-800 hover:text-white px-5 py-3 rounded-xl font-bold transition-colors duration-300 shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </SubmitButton>
                  </form>
                  <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {categories.map(cat => (
                      <li key={cat.id} className="group flex justify-between items-center p-3.5 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all duration-300">
                        <span className="font-semibold text-gray-700 text-sm">{cat.nom}</span>
                        <form action={async (formData: FormData) => {
                          'use server'
                          await deleteCategory(cat.id)
                        }}>
                          <SubmitButton variant="icon" className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </SubmitButton>
                        </form>
                      </li>
                    ))}
                    {categories.length === 0 && (
                      <p className="text-sm text-gray-400 italic text-center py-4">Aucune catégorie existante.</p>
                    )}
                  </ul>
            </section>
          </div>

          {/* Colonne Droite : Galerie */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Galerie d'images */}
            <AdminGallery photos={photos} categories={categories} />
          </div>

        </div>
      )}

        </div>
      </div>
      
      {/* Scrollbar style addition */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cccce8; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7e7ea8; }
      `}} />
    </main>
  )
}
