import React from 'react';
import Title from '@/components/Title';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mentions Légales - La Remise',
};

export default function MentionsLegales() {
  return (
    <>
      <Menu />
      <main className="min-h-screen pt-12 pb-20 px-4 max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex justify-center mb-4">
          <Title text="MENTIONS LÉGALES" />
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-md border-[3px] border-primary space-y-8 text-gray-800 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Éditeur du site</h2>
            <p>
              Le présent site "La Remise" est édité par :<br />
              <strong>Cindy et Guillaume LESBROS (GAEC de la Beoux)</strong><br />
              Adresse : 665 Route du Devoluy, 05400 Montmaur, France<br />
              Téléphone : +33 6 72 56 24 64<br />
              Email : cindy@gmail.com<br />
              SIRET : 513 089 227 00013
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Directeur de la publication</h2>
            <p>
              Le directeur de la publication du site internet est <strong>Cindy et Guillaume LESBROS</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Réalisation du site</h2>
            <p>
              Ce site a été conçu et développé par :<br />
              <strong>Paul Comte</strong><br />
              Email : paul.comte3878@gmail.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong><br />
              Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
              Site internet : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com</a><br />
              Vercel assure le stockage direct et permanent du site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="mt-2">
              Les textes, images et photographies présents sur ce site sont la propriété exclusive de Cindy et Guillaume LESBROS et de "La Remise". 
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens hypertextes vers d'autres sites. L'éditeur n'a pas la possibilité de vérifier le contenu des sites ainsi visités, et n'assumera en conséquence aucune responsabilité de ce fait.
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
