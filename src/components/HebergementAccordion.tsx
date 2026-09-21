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
          isOpen ? 'max-h-[1000px] opacity-100 mt-4 mb-6' : 'max-h-0 opacity-0'
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
import { createPortal } from 'react-dom';

const Carousel = ({ photos }: { photos: Photo[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Empêcher le scroll du body quand la lightbox est ouverte
  React.useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

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

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const lightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? photos.length - 1 : lightboxIndex - 1);
    }
  };
  
  const lightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  return (
    <>
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 relative w-full snap-x scrollbar-hide"
        >
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              onClick={() => openLightbox(index)}
              className={`cursor-pointer shrink-0 overflow-hidden ${index === 0 ? 'w-[85%] md:w-[75%]' : 'w-[60%] md:w-[40%]'} aspect-[4/3] shadow-lg snap-center hover:opacity-95 transition-opacity`}
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

        {/* Scroll Left Button - Centrage parfait avec absolute 0, bottom 1rem, flex center */}
        <div className="absolute left-2 top-0 bottom-4 flex items-center pointer-events-none">
          <button 
            onClick={scrollLeft}
            className="pointer-events-auto cursor-pointer z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-md"
            aria-label="Défiler vers la gauche"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Scroll Right Button - Centrage parfait avec absolute 0, bottom 1rem, flex center */}
        <div className="absolute right-2 top-0 bottom-4 flex items-center pointer-events-none">
          <button 
            onClick={scrollRight}
            className="pointer-events-auto cursor-pointer z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-md"
            aria-label="Défiler vers la droite"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Lightbox / Fullscreen Viewer */}
      {lightboxIndex !== null && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-0 md:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white p-3 bg-black/50 hover:bg-black/80 rounded-full z-[99999] transition-colors cursor-pointer shadow-lg"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left Arrow (Desktop) */}
          <button 
            onClick={lightboxPrev}
            className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 hover:bg-black/80 rounded-full z-[99999] transition-colors cursor-pointer shadow-lg"
            aria-label="Photo précédente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div className="w-full h-full flex items-center justify-center relative" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photos[lightboxIndex].url} 
              alt={photos[lightboxIndex].texte_alternatif || `Vue ${lightboxIndex + 1}`} 
              className="max-w-full max-h-[85vh] md:max-h-full object-contain pointer-events-none select-none"
            />
          </div>

          {/* Right Arrow (Desktop) */}
          <button 
            onClick={lightboxNext}
            className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 hover:bg-black/80 rounded-full z-[99999] transition-colors cursor-pointer shadow-lg"
            aria-label="Photo suivante"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Counter (Desktop) */}
          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm tracking-widest backdrop-blur-sm pointer-events-none shadow-lg">
            {lightboxIndex + 1} / {photos.length}
          </div>

          {/* Mobile Navigation Bar (Bottom) */}
          <div className="absolute bottom-6 w-full flex md:hidden items-center justify-center gap-6 z-[99999]" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={lightboxPrev}
              className="text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer shadow-lg"
              aria-label="Photo précédente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="text-white font-medium bg-black/50 px-4 py-2 rounded-full text-sm tracking-widest backdrop-blur-sm pointer-events-none shadow-lg">
              {lightboxIndex + 1} / {photos.length}
            </div>

            <button 
              onClick={lightboxNext}
              className="text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer shadow-lg"
              aria-label="Photo suivante"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
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
