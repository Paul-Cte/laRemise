"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Title from './Title';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to add white background to menu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state if page is loaded already scrolled down
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className="h-[88px] w-full shrink-0">
        <nav className="w-full fixed top-0 left-0 z-40 py-4 pointer-events-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-14 items-center">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center font-bold pointer-events-auto">
                <Link href="/" className="text-xl leading-none">
                  LA <br /> <span className="text-secondary">REMISE.</span>
                </Link>
              </div>
              
              {/* Desktop Menu - Bubble */}
              <div className={`pointer-events-auto hidden md:flex items-center space-x-6 font-bold transition-all duration-300 rounded-full px-6 py-2 ${isScrolled ? 'bg-white' : 'bg-transparent'}`}>
                <Link href="#presentation" className="hover:text-secondary transition-colors">
                  PRÉSENTATION
                </Link>
                <Link href="#hebergement" className="hover:text-secondary transition-colors">
                  HÉBERGEMENT
                </Link>
                <Link href="#activites" className="hover:text-secondary transition-colors">
                  ACTIVITÉS
                </Link>
                <Link href="#contact" className="hover:text-secondary transition-colors">
                  CONTACT
                </Link>
                <Link href="tel:0672562463" className="text-white px-5 py-2 rounded-full bg-black hover:bg-gray-800 transition-colors ml-2">
                  06 72 56 24 63
                </Link>
              </div>

              {/* Mobile menu button - Bubble */}
              <div className="md:hidden flex items-center pointer-events-auto">
                <button 
                  onClick={() => setIsOpen(true)}
                  className={`cursor-pointer text-black hover:text-gray-700 focus:outline-none transition-all duration-300 p-2 rounded-full ${isScrolled ? 'bg-white' : 'bg-transparent'}`}
                  aria-label="Ouvrir le menu"
                >
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/40 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`md:hidden fixed inset-y-0 right-0 z-[60] w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-5">
          <button 
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-gray-800 hover:text-black focus:outline-none bg-gray-100 rounded-full p-2"
            aria-label="Fermer le menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-start pt-4 sm:pt-10 space-y-0 sm:space-y-2 flex-1 pb-20 overflow-y-auto overflow-x-hidden px-2 w-full">
            <Link href="#presentation" onClick={() => setIsOpen(false)}>
              <Title text="PRÉSENTATION" />
            </Link>
            <Link href="#hebergement" onClick={() => setIsOpen(false)}>
              <Title text="HÉBERGEMENT" />
            </Link>
            <Link href="#activites" onClick={() => setIsOpen(false)}>
              <Title text="ACTIVITÉS" />
            </Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>
              <Title text="CONTACT" />
            </Link>
            
            <div className="mt-8">
              <Link 
                href="tel:0672562463" 
                onClick={() => setIsOpen(false)} 
                className="text-white px-8 py-4 rounded-full bg-black font-bold text-lg inline-block hover:bg-gray-800 transition-colors"
              >
                06 72 56 24 63
              </Link>
            </div>
        </div>
      </div>
    </>
  );
}
