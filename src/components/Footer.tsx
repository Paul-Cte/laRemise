import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-white py-8 mt-16 border-t-[8px] border-secondary">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-tangerine font-bold mb-2 text-secondary">La Remise.</h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Gîte rural à la montagne<br />
            665 Route du Devoluy, 05400 Montmaur, France<br />
            Téléphone : +33 6 72 56 24 64<br />
            Email : cindy@gmail.com
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2 text-sm opacity-90">
          <p>© {currentYear} La Remise. Tous droits réservés.</p>
          <div className="flex gap-4 mt-2">
            <Link href="/mentions-legales" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">
              Mentions Légales
            </Link>
            <span>|</span>
            <Link href="/politique-confidentialite" className="hover:text-secondary transition-colors underline-offset-4 hover:underline">
              Politique de confidentialité
            </Link>
          </div>
          <div className="mt-4 text-xs opacity-60">
            Site réalisé par <a href="mailto:paul.comte3878@gmail.com" className="hover:text-secondary hover:underline transition-colors">Paul Comte</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
