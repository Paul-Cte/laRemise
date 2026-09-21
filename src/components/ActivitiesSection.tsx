"use client";

import React, { useState } from 'react';

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const defaultActivitiesData: ActivityItem[] = [
  {
    id: 'montmaur',
    title: 'Le chateau de Montmaur',
    description: "Les voyageurs aiment l'emplacement pittoresque de ce logement.",
    // Image factice de château pour l'exemple
    image: 'https://images.unsplash.com/photo-1549880338-65dd4bd07928?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'ferme',
    title: 'La ferme laitière',
    description: "Venez découvrir la traite des vaches et notre production locale dans une ambiance familiale.",
    // Image factice de ferme/vaches
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'pic',
    title: 'Pic de Bure',
    description: "Profitez de randonnées exceptionnelles avec des panoramas à couper le souffle sur les Alpes.",
    // Image factice de montagne
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  }
];

interface ActivitiesSectionProps {
  activities?: ActivityItem[];
}

export default function ActivitiesSection({ activities = defaultActivitiesData }: ActivitiesSectionProps) {
  // Le premier élément est actif par défaut
  const [activeActivity, setActiveActivity] = useState(activities[0]?.id || '1');

  const CameraIcon = () => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="opacity-70"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );

  return (
    <div className="w-full">
      
      {/* Version Mobile : Slider horizontal de cartes */}
      <div 
        className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 pt-2 -mx-4 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .mobile-slider::-webkit-scrollbar { display: none; }
        `}} />
        {activities.map((activity) => (
          <div key={`mob-${activity.id}`} className="mobile-slider snap-center shrink-0 w-[85%] flex flex-col bg-white rounded-[2rem] border-[3px] border-primary overflow-hidden shadow-lg">
            <div className="w-full h-56 relative">
              <img src={activity.image} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-6 bg-secondary/20">
              <h3 className="text-primary font-bold text-4xl font-tangerine mb-3">{activity.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Version PC : Image de fond interactive */}
      <div className="hidden md:block relative w-full aspect-[21/9] rounded-[3rem] border-4 border-[#5a597a] overflow-hidden shadow-xl bg-gray-200">
        
        {/* Images d'arrière-plan avec Cross-fade */}
        {activities.map((activity) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            key={`bg-${activity.id}`}
            src={activity.image}
            alt={activity.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              activeActivity === activity.id ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Superposition de dégradé pour s'assurer que le texte/bulles restent lisibles si l'image est claire en bas */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row items-stretch md:items-end gap-4 z-10">
          
          {activities.map((activity) => {
            const isActive = activeActivity === activity.id;
            
            return (
              <button
                key={activity.id}
                onMouseEnter={() => setActiveActivity(activity.id)}
                onClick={() => setActiveActivity(activity.id)} 
                className={`
                  text-left transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden
                  border-[3px] border-[#72719c] bg-[#c8c7eb]/90 backdrop-blur-sm shadow-lg
                  flex-1 w-full cursor-pointer rounded-[2rem]
                  ${isActive ? 'p-6' : 'py-3 px-6 hover:bg-[#d6d5f2]'}
                `}
              >
                <div className="flex w-full justify-between items-center">
                  <h3 
                    className={`text-[#5a597a] font-bold transition-all duration-300 font-tangerine ${isActive ? 'text-4xl' : 'text-3xl'}`}
                  >
                    {activity.title}
                  </h3>
                  
                  {/* Icône appareil photo avec transition fluide */}
                  <div className={`text-[#5a597a] transition-all duration-300 overflow-hidden flex items-center justify-end ${isActive ? 'max-w-0 opacity-0' : 'max-w-[30px] opacity-100'}`}>
                    <CameraIcon />
                  </div>
                </div>
                
                <div 
                  className={`transition-all duration-500 overflow-hidden w-full ${
                    isActive ? 'opacity-100 max-h-40 mt-3' : 'opacity-0 max-h-0 mt-0'
                  }`}
                >
                  <p className="text-gray-900 text-sm md:text-base font-medium leading-relaxed drop-shadow-md">
                    {activity.description}
                  </p>
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
