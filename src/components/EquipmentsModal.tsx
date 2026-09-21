"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EquipmentsModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
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

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-white overflow-y-auto">
      {/* Close button */}
      <button 
        onClick={onClose}
        className="cursor-pointer fixed top-6 left-6 z-[110] bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-gray-800 antialiased p-4 md:p-8 lg:p-12 min-h-screen w-full mt-16 md:mt-0">
        <div className="max-w-7xl mx-auto">
            
            <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900 mt-4 md:mt-0">Tout ce que vous trouverez dans le logement</h1>

            {/* Conteneur Masonry pour les cartes */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">

                {/* VUES */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f] flex items-center gap-2">
                        <i className="fa-solid fa-mountain-sun"></i> Vues
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-panorama text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Vues panoramiques</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-tree text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Vue sur le jardin</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-mountain text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Vue sur la montagne</span>
                        </div>
                    </div>
                </div>

                {/* SALLE DE BAIN */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Salle de bain
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-sink text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Salle de bain</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-bath text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Baignoire</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-wind text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Sèche-cheveux</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-spray-can text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Produits de nettoyage</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-faucet-drip text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Eau chaude</span>
                        </div>
                    </div>
                </div>

                {/* CHAMBRE ET LINGE */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Chambre et linge
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-jug-detergent text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Lave-linge (Gratuit)</span>
                                <span className="text-xs text-gray-500 mt-1">dans le logement</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-shirt text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Cintres</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-bed text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Linge de lit</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-mattress-pillow text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Oreillers et couvertures supplémentaires</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-person-through-window text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Stores occultants</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-shirt text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Fer à repasser</span>
                        </div>
                    </div>
                </div>

                {/* DIVERTISSEMENT */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Divertissement
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-tv text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Télévision</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-volume-high text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Système audio</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-book-open text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Livres et de quoi lire</span>
                        </div>
                    </div>
                </div>

                {/* FAMILLE */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Famille
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-baby text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Lit pour bébé</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-baby-carriage text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Lit parapluie</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-puzzle-piece text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Livres et jouets pour enfants</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-chair text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Chaise haute</span>
                        </div>
                    </div>
                </div>

                {/* CHAUFFAGE ET CLIMATISATION */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Chauffage et climatisation
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-snowflake text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Climatisation</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-temperature-arrow-up text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Chauffage</span>
                        </div>
                    </div>
                </div>

                {/* SÉCURITÉ À LA MAISON */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Sécurité à la maison
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-shield-halved text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Détecteur de fumée</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-shield text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Détecteur de monoxyde de carbone</span>
                        </div>
                    </div>
                </div>
                
                {/* INTERNET ET BUREAU */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Internet et bureau
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-wifi text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Wifi</span>
                        </div>
                    </div>
                </div>

                {/* CUISINE ET SALLE À MANGER */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Cuisine et salle à manger
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-kitchen-set text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Cuisine</span>
                                <span className="text-xs text-gray-500 mt-1">Espace où les voyageurs peuvent cuisiner</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-regular fa-snowflake text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Réfrigérateur</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-microwave text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Four à micro-ondes</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-pan-frying text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Casseroles et poêles, huile, sel et poivre</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-utensils text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Vaisselle et couverts</span>
                        </div>
                    </div>
                </div>

                {/* CARACTÉRISTIQUES DE L'EMPLACEMENT */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Caractéristiques de l'emplacement
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-person-skiing text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Au pied des pistes</span>
                                <span className="text-xs text-gray-500 mt-1">Les voyageurs peuvent accéder aux remontées mécaniques sans conduire ni prendre de transport payant</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-door-open text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Entrée privée</span>
                                <span className="text-xs text-gray-500 mt-1">Entrée par une rue différente ou un immeuble séparé</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EXTÉRIEUR */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Extérieur
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-tree text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Arrière-cour privée - Clôture partielle</span>
                                <span className="text-xs text-gray-500 mt-1">Un espace ouvert du logement généralement recouvert d'herbe</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-fire text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Brasero</span>
                        </div>
                    </div>
                </div>

                {/* PARKING ET INSTALLATIONS */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Parking et installations
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-car text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <span className="text-sm font-medium">Stationnement gratuit sur place</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-house text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Logement de plain-pied</span>
                                <span className="text-xs text-gray-500 mt-1">Pas d'escaliers dans le logement</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SERVICES */}
                <div className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-[#f0eef5] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#39364f]">
                        Services
                    </div>
                    <div className="p-5 flex flex-col gap-5">
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-paw text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Animaux acceptés</span>
                                <span className="text-xs text-gray-500 mt-1">Les animaux d'assistance sont toujours autorisés</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-regular fa-calendar-days text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Séjours longue durée autorisés</span>
                                <span className="text-xs text-gray-500 mt-1">Séjours de 28 jours ou plus autorisés</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <i className="fa-solid fa-lock text-[#5a647d] mt-1 text-lg w-6 text-center"></i>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">Arrivée autonome</span>
                                <span className="text-xs text-gray-500 mt-1">Boîte à clé sécurisée</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
