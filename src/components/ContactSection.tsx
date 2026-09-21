import React from 'react';
import Calendar from './Calendar';
import { getBookedDates } from '@/app/actions/calendar';
import { getSetting } from '@/app/actions/settings';

export default async function ContactSection() {
  const bookedDates = await getBookedDates();
  const contactPhone = await getSetting('contact_phone') || '+33 6 72 56 24 64';
  const contactEmail = await getSetting('contact_email') || 'cindy@gmail.com';

  return (
    <div className="w-full bg-background flex flex-col items-center justify-center py-8 font-sans mt-4 mb-8">
      
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24 mb-16">
        
        {/* =========================================
            COLONNE GAUCHE : PROFIL ET DESCRIPTION
            ========================================= */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          
          {/* Avatar et Nom */}
          <div className="flex items-center gap-6 mb-6">
            {/* Cercle Avatar */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-sm bg-primary">
              <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 mt-2">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            
            {/* Nom en écriture cursive */}
            <h2 className="text-6xl md:text-7xl font-bold font-tangerine text-primary">
              Cindy
            </h2>
          </div>

          {/* Ligne de séparation courte */}
          <div className="w-20 border-b-2 mb-6 border-primary"></div>

          {/* Texte de description */}
          <p className="text-gray-700 leading-relaxed text-lg">
            Une question, une demande<br/>
            particulière ou envie de réserver votre<br/>
            séjour ?<br/>
            Cindy est là pour vous renseigner et<br/>
            vous accompagner avant, pendant et<br/>
            après votre venue.
          </p>
        </div>


        {/* =========================================
            COLONNE DROITE : CARTE DE CONTACT
            ========================================= */}
        <div className="w-[92%] sm:w-[96%] md:w-1/2 relative mt-16 md:mt-0 p-4 md:p-10 lg:p-12 mx-auto md:mx-0">
          
          {/* Carte Arrière (Violet Clair, légèrement pivotée) */}
          <div className="absolute inset-0 rounded-[2rem] border-[3px] border-primary transform rotate-[2deg] md:rotate-[4deg] translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 shadow-sm bg-secondary">
            
            {/* Le tracteur SVG (Maintenant posé sur la ligne de la carte violette) */}
            <div className="absolute bottom-[calc(100%-3px)] right-6 w-28 h-28 md:w-32 md:h-32 pointer-events-none text-primary">
              <svg 
                viewBox="0 0 50 50" 
                fill="currentColor" 
                className="w-full h-full bg-transparent"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.96875 5C4.335938 5 3 6.367188 3 8L3 24.40625C2.601563 24.683594 2.214844 24.96875 1.84375 25.28125C1.394531 25.660156 1.339844 26.332031 1.71875 26.78125C2.097656 27.230469 2.769531 27.285156 3.21875 26.90625C5.675781 24.839844 8.820313 23.59375 12.28125 23.59375C20.089844 23.59375 26.40625 29.914063 26.40625 37.71875C26.367188 38.117188 26.558594 38.503906 26.898438 38.714844C27.238281 38.929688 27.667969 38.929688 28.007813 38.714844C28.347656 38.503906 28.539063 38.117188 28.5 37.71875C28.5 37.476563 28.480469 37.238281 28.46875 37L32.78125 37C31.671875 38.371094 31 40.105469 31 42C31 46.40625 34.59375 50 39 50C43.40625 50 47 46.40625 47 42C47 39.867188 46.148438 37.9375 44.78125 36.5C44.980469 36.390625 45.15625 36.257813 45.34375 36.125C46.042969 35.617188 46.664063 34.964844 46.96875 34.125L49.875 26.1875C50.210938 25.273438 49.796875 24.265625 49.1875 23.75C48.578125 23.234375 47.835938 23 47.0625 23L40.0625 23L40.0625 17C40.0625 15.09375 40.492188 14.40625 40.71875 14.1875C40.832031 14.078125 40.925781 14.074219 40.96875 14.0625C41.257813 14.074219 41.535156 13.964844 41.742188 13.765625C41.949219 13.566406 42.066406 13.289063 42.0625 13L42.0625 11C42.066406 10.71875 41.953125 10.445313 41.753906 10.246094C41.554688 10.046875 41.28125 9.933594 41 9.9375C39.710938 9.9375 38.007813 10.171875 36.53125 11.1875C35.054688 12.203125 33.9375 14.058594 33.9375 16.8125L33.9375 23L28.78125 23L24.65625 7.78125C24.652344 7.757813 24.628906 7.742188 24.625 7.71875C24.480469 7.078125 24.214844 6.453125 23.75 5.9375C23.269531 5.402344 22.511719 5 21.6875 5 Z M 5.96875 7L21.6875 7C21.949219 7 22.109375 7.058594 22.28125 7.25C22.453125 7.441406 22.601563 7.789063 22.6875 8.1875C22.695313 8.207031 22.707031 8.230469 22.71875 8.25L27.0625 24.25C27.175781 24.691406 27.574219 25 28.03125 25L34.625 25C34.855469 25.082031 35.113281 25.082031 35.34375 25L38.625 25C38.855469 25.082031 39.113281 25.082031 39.34375 25L47.0625 25C47.378906 25 47.753906 25.152344 47.90625 25.28125C48.058594 25.410156 48.035156 25.320313 47.96875 25.5L45.09375 33.4375C45 33.691406 44.609375 34.171875 44.15625 34.5C43.703125 34.828125 43.167969 35 42.96875 35L28.25 35C26.949219 27.351563 20.296875 21.5 12.28125 21.5C9.664063 21.5 7.195313 22.121094 5 23.21875L5 8C5 7.4375 5.429688 7 5.96875 7 Z M 7.8125 9C7.335938 9.089844 6.992188 9.511719 7 10L7 19C7 19.550781 7.449219 20 8 20L22.90625 20C23.214844 20 23.507813 19.855469 23.695313 19.613281C23.886719 19.367188 23.953125 19.050781 23.875 18.75L21.4375 9.75C21.324219 9.308594 20.925781 9 20.46875 9L8 9C7.96875 9 7.9375 9 7.90625 9C7.875 9 7.84375 9 7.8125 9 Z M 9 11L19.71875 11L21.625 18L9 18 Z M 39.9375 12.1875L39.9375 12.3125C39.714844 12.425781 39.503906 12.472656 39.28125 12.6875C38.507813 13.429688 37.9375 14.757813 37.9375 17L37.9375 23L36.0625 23L36.0625 16.8125C36.0625 14.574219 36.777344 13.554688 37.71875 12.90625C38.363281 12.460938 39.15625 12.292969 39.9375 12.1875 Z M 12 26C5.386719 26 0 31.386719 0 38C0 44.613281 5.386719 50 12 50C18.613281 50 24 44.613281 24 38C24 31.386719 18.613281 26 12 26 Z M 12 28C17.53125 28 22 32.46875 22 38C22 43.53125 17.53125 48 12 48C11.65625 48 11.304688 47.972656 10.96875 47.9375C10.632813 47.902344 10.292969 47.878906 9.96875 47.8125C5.40625 46.882813 2 42.839844 2 38C2 37.652344 2.027344 37.304688 2.0625 36.96875C2.574219 31.917969 6.816406 28 12 28 Z M 11.90625 32.5C11.875 32.507813 11.84375 32.519531 11.8125 32.53125C11.75 32.535156 11.6875 32.546875 11.625 32.5625C11.613281 32.574219 11.605469 32.582031 11.59375 32.59375C8.769531 32.816406 6.5 35.121094 6.5 38C6.5 41.023438 8.976563 43.5 12 43.5C15.023438 43.5 17.5 41.023438 17.5 38C17.5 35.144531 15.265625 32.847656 12.46875 32.59375C12.433594 32.589844 12.410156 32.566406 12.375 32.5625C12.273438 32.523438 12.167969 32.503906 12.0625 32.5C12.042969 32.5 12.019531 32.5 12 32.5C11.96875 32.5 11.9375 32.5 11.90625 32.5 Z M 11.9375 34.5C11.957031 34.5 11.980469 34.5 12 34.5C13.941406 34.5 15.5 36.0625 15.5 38C15.5 39.9375 13.9375 41.5 12 41.5C10.0625 41.5 8.5 39.9375 8.5 38C8.5 36.082031 10.027344 34.535156 11.9375 34.5 Z M 35.625 37L38.90625 37C38.875 37.007813 38.84375 37.019531 38.8125 37.03125C38.75 37.035156 38.6875 37.046875 38.625 37.0625C38.613281 37.074219 38.605469 37.082031 38.59375 37.09375C36.042969 37.3125 34 39.398438 34 42C34 44.746094 36.253906 47 39 47C41.746094 47 44 44.746094 44 42C44 39.417969 41.988281 37.34375 39.46875 37.09375C39.433594 37.089844 39.410156 37.066406 39.375 37.0625C39.316406 37.035156 39.25 37.015625 39.1875 37L42.375 37C42.414063 37.046875 42.453125 37.085938 42.5 37.125C44.019531 38.214844 45 39.984375 45 42C45 45.320313 42.320313 48 39 48C35.679688 48 33 45.320313 33 42C33 40.070313 33.898438 38.347656 35.3125 37.25C35.433594 37.1875 35.539063 37.105469 35.625 37 Z M 39 39C40.660156 39 42 40.335938 42 42C42 43.664063 40.660156 45 39 45C37.335938 45 36 43.660156 36 42C36 40.339844 37.335938 39 39 39Z" />
              </svg>
            </div>
          </div>

          {/* Carte Avant (Blanche) */}
          <div className="relative bg-white rounded-[2rem] border-[3px] border-primary p-6 md:p-8 shadow-lg">
            
            {/* Titre de la carte */}
            <h3 className="text-xl md:text-2xl font-bold text-center mb-10 mt-4 leading-snug text-primary">
              N'hésitez pas à me contacter<br/>pour réserver !
            </h3>

            <div className="flex flex-col gap-6 items-center px-4">
              
              {/* Ligne Téléphone */}
              <div className="flex items-center gap-6 w-full max-w-[280px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <a 
                  href={`tel:${contactPhone.replace(/\\s/g, '')}`} 
                  className="cursor-pointer text-xl font-black text-gray-900 tracking-wide hover:text-primary transition-colors"
                >
                  {contactPhone}
                </a>
              </div>

              {/* Ligne de séparation horizontale (fine) */}
              <div className="w-full max-w-[300px] border-b border-primary"></div>

              {/* Ligne Email */}
              <div className="flex items-center gap-6 w-full max-w-[280px]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-secondary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="cursor-pointer text-xl font-black text-gray-900 tracking-wide break-all hover:text-primary transition-colors"
                >
                  {contactEmail}
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
      
      {/* =========================================
          SECTION : CALENDRIER ET CARTE
          ========================================= */}
      <div className="w-full max-w-6xl mt-8 px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-center items-stretch">
          
          {/* Bloc Calendrier (1/3) */}
          <div className="flex flex-col items-center w-full lg:w-1/3">
            <h3 className="text-3xl font-bold font-tangerine text-primary mb-6">Disponibilités</h3>
            <div className="w-full h-full flex flex-col">
              <Calendar bookedDates={bookedDates} />
            </div>
          </div>

          {/* Bloc Google Maps (2/3) */}
          <div className="flex flex-col items-center w-full lg:w-2/3">
            <h3 className="text-3xl font-bold font-tangerine text-primary mb-6">Nous trouver</h3>
            <div className="w-full mx-auto bg-white p-3 rounded-[2rem] border-[3px] border-primary shadow-sm flex-1 flex flex-col min-h-[350px] lg:min-h-[auto]">
              <div className="w-full h-full rounded-2xl overflow-hidden flex-1 relative">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Montmaur,+05400,+France&t=&z=12&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
