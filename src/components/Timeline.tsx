import React from 'react';

export type TimelineItemProps = {
  time?: string;
  description?: string;
  position?: 'top' | 'bottom';
  color: string;
  hasBorder: boolean;
  isEmpty?: boolean;
};

const defaultTimelineData: TimelineItemProps[] = [
  {
    time: '5 min',
    description: 'Randonnée qui part du pied du pic de Bure',
    position: 'top',
    color: 'bg-white',
    hasBorder: true
  },
  {
    time: '7 min',
    description: 'La petite promenade pleine de surprise',
    position: 'bottom',
    color: 'bg-primary',
    hasBorder: false
  },
  {
    time: '20 min',
    description: 'La petite promenade pleine de surprise',
    position: 'top',
    color: 'bg-secondary',
    hasBorder: false
  },
  {
    time: '25 min',
    description: 'La ville de gap avec ses petites boutiques',
    position: 'bottom',
    color: 'bg-white',
    hasBorder: true
  },
  {
    time: '45 min',
    description: 'Découverte des alentours et détente',
    position: 'top',
    color: 'bg-primary',
    hasBorder: false
  }
];

interface TimelineProps {
  timelineItems?: TimelineItemProps[];
}

const Timeline = ({ timelineItems = defaultTimelineData }: TimelineProps) => {

  // Le clip-path pour créer la forme de chevron/flèche
  // Il va de gauche à droite, avec une encoche à gauche et une pointe à droite
  const arrowClipPath = "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%)";
  
  // Le premier élément n'a pas l'encoche à gauche
  const firstArrowClipPath = "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%, 0% 50%)";

  return (
    <div className="min-h-[auto] md:min-h-[600px] bg-background flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden w-full">
      <div className="w-full max-w-5xl relative">
        
        {/* Mobile Vertical Timeline */}
        <div className="md:hidden flex flex-col w-full relative py-4 space-y-6">
          {/* Ligne verticale continue */}
          <div className="absolute top-4 bottom-4 left-8 w-[3px] bg-primary -translate-x-1/2 rounded-full"></div>
          
          {timelineItems.filter(item => !item.isEmpty).map((item, index) => (
            <div key={index} className="relative pl-16 pr-2">
              {/* Point sur la ligne */}
              <div className={`absolute left-8 top-7 w-5 h-5 rounded-full z-10 -translate-x-1/2 -translate-y-1/2 ${item.hasBorder || item.color === 'bg-white' ? 'bg-white border-[4px] border-primary' : 'bg-secondary border-[4px] border-primary'} shadow-sm`}></div>
              
              {/* Contenu */}
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border-2 border-secondary shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-1">
                  {item.time}
                </h3>
                <p className="text-gray-600 text-sm leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="relative h-24 hidden md:flex items-center w-full">
          
          {timelineItems.map((item, index) => {
            
            // Calcul du décalage pour l'emboîtement (négatif margin-left)
            const isFirst = index === 0;
            const overlapClass = isFirst ? "" : "-ml-8 md:-ml-12";
            const currentClipPath = isFirst ? firstArrowClipPath : arrowClipPath;

            return (
              <div 
                key={index}
                className={`h-full flex-1 relative group ${overlapClass}`}
                style={{ zIndex: timelineItems.length - index }}
              >
                
                {/* 
                  Le fond de la flèche avec clip-path 
                  Il est séparé du conteneur parent pour ne pas couper les textes qui dépassent !
                */}
                <div 
                  className={`absolute inset-0 transition-all duration-300 group-hover:opacity-75 ${item.hasBorder ? 'bg-secondary' : item.color}`}
                  style={{ clipPath: currentClipPath }}
                >
                  {/* Pseudo-bordure intérieure pour les flèches claires */}
                  {item.hasBorder && (
                    <div 
                      className={`absolute ${item.color}`}
                      style={{
                        top: '3px', bottom: '3px', left: isFirst ? '3px' : '4px', right: '4px',
                        clipPath: currentClipPath,
                      }}
                    ></div>
                  )}
                </div>

                {/* Contenu Texte et Ligne verticale (Affiché seulement si ce n'est pas l'embout vide) */}
                {!item.isEmpty && (
                  <div 
                    className={`
                      absolute left-[20%] md:left-[35%] w-48 md:w-64
                      ${item.position === 'top' ? 'bottom-full mb-0' : 'top-full mt-0'}
                    `}
                  >
                    
                    {/* Conteneur pour aligner le texte et la ligne */}
                    <div className={`flex flex-col ${item.position === 'top' ? 'justify-end h-32 md:h-40' : 'justify-start h-32 md:h-40'} relative`}>
                      
                      {/* La ligne verticale */}
                      <div 
                        className={`
                          absolute left-0 w-px bg-primary
                          ${item.position === 'top' ? 'bottom-0 h-full' : 'top-0 h-full'}
                        `}
                      ></div>

                      {/* Le bloc de texte */}
                      <div className={`pl-4 ${item.position === 'top' ? 'pb-4' : 'pt-4'}`}>
                        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                          {item.time}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-snug">
                          {item.description}
                        </p>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
