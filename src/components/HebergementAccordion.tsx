"use client";

import React, { useState } from 'react';
import { Database } from '@/types/database';

type Category = Database['public']['Tables']['categories']['Row'];
type Photo = Database['public']['Tables']['photos']['Row'];

const AccordionItem = ({ title, isOpen, onClick, children }: any) => {
  return (
    <div className="mb-2 border-b border-black/10">
      <button
        onClick={onClick}
        className={`cursor-pointer w-full flex justify-between items-center py-4 px-6 text-left font-bold transition-colors ${
          isOpen ? 'bg-[#d6d6e6] text-black' : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        <span className="uppercase tracking-wider text-sm">{title}</span>
        <span className="text-2xl leading-none font-normal relative">
          {isOpen ? (
            // Minus icon
            <div className="w-4 h-1 bg-black"></div>
          ) : (
            // Plus icon (SVG for exact visual match to image)
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round"/>
            </svg>
          )}
        </span>
      </button>
      
      {/* Expandable content area */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 mt-4 mb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-0">
          {children}
        </div>
      </div>
    </div>
  );
};

import { useRef } from 'react';

const Carousel = ({ photos }: { photos: Photo[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (photos.length === 0) {
    return <div className="py-8 text-center text-white/70 italic">Aucune photo pour l'instant dans cette catégorie...</div>;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {/* Scroll Left Button */}
      <button 
        onClick={scrollLeft}
        className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        aria-label="Défiler vers la gauche"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 relative w-full snap-x scrollbar-hide"
      >
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className={`shrink-0 overflow-hidden ${index === 0 ? 'w-[85%] md:w-[75%]' : 'w-[60%] md:w-[40%]'} aspect-[4/3] shadow-lg snap-center`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photo.url} 
              alt={photo.texte_alternatif || `Vue ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button 
        onClick={scrollRight}
        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        aria-label="Défiler vers la droite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

interface Props {
  categories: Category[];
  photos: Photo[];
}

import EquipmentsModal from './EquipmentsModal';

export default function HebergementAccordion({ categories, photos }: Props) {
  // State to track which accordion section is open. Default to the first category if it exists.
  const [openSection, setOpenSection] = useState<string | null>(categories.length > 0 ? categories[0].id : null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="w-full mt-12">
      {/* Accordion container */}
      <div className="w-full">
        {categories.map((category) => {
          const categoryPhotos = photos.filter(p => p.category_id === category.id);
          return (
            <AccordionItem 
              key={category.id}
              title={category.nom}
              isOpen={openSection === category.id}
              onClick={() => toggleSection(category.id)}
            >
              <Carousel photos={categoryPhotos} />
            </AccordionItem>
          );
        })}
      </div>

      {/* Action button */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-white text-primary font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors text-sm"
        >
          Ce que propose ce logement
        </button>
      </div>

      <EquipmentsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
