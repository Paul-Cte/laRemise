import React from 'react';
import Title from '@/components/Title';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Politique de Confidentialité - La Remise',
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Menu />
      <main className="min-h-screen pt-12 pb-20 px-4 max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex justify-center mb-4">
          <Title text="CONFIDENTIALITÉ" />
        </div>
        
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-md border-[3px] border-primary space-y-8 text-gray-800 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. Collecte de données</h2>
            <p>
              Le site internet "La Remise" est un site vitrine informatif. <strong>Il ne collecte aucune donnée personnelle.</strong>
            </p>
            <p className="mt-2">
              Le site ne comporte aucun formulaire de contact, aucun système de création de compte, ni aucun module de réservation intégré nécessitant la saisie d'informations personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. Prise de contact</h2>
            <p>
              Lorsque vous décidez de nous contacter pour une réservation ou un renseignement, vous le faites directement via votre propre messagerie (en cliquant sur notre adresse email) ou par téléphone.
            </p>
            <p className="mt-2">
              Les informations que vous nous communiquez lors de ces échanges (nom, prénom, numéro de téléphone, dates de séjour) sont traitées uniquement par les propriétaires du gîte, Cindy et Guillaume LESBROS, dans le seul but de répondre à votre demande et d'organiser votre séjour. Elles ne sont jamais vendues, louées ou cédées à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. Cookies et traceurs</h2>
            <p>
              <strong>Ce site n'utilise aucun cookie.</strong>
            </p>
            <p className="mt-2">
              Nous n'utilisons aucun outil d'analyse d'audience (comme Google Analytics), aucun traceur publicitaire, et aucun cookie de suivi du comportement. Votre navigation sur ce site est totalement anonyme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. Vos droits (RGPD)</h2>
            <p>
              Bien que le site lui-même ne collecte aucune donnée, si vous nous avez contactés par téléphone ou par email, vous disposez, conformément au Règlement Général sur la Protection des Données (RGPD), d'un droit d'accès, de rectification et de suppression des données échangées.
            </p>
            <p className="mt-4">
              Pour exercer ces droits, il vous suffit de nous en faire la demande par email à l'adresse suivante :<br />
              <strong><a href="mailto:cindy@gmail.com" className="text-primary hover:underline">cindy@gmail.com</a></strong>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
