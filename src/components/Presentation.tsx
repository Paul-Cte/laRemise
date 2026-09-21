"use client";

import { useEffect, useRef, useState } from "react";

export default function Presentation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [pathLength, setPathLength] = useState(0);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }

        const handleScroll = () => {
            if (!containerRef.current || !pathRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calcul du pourcentage de scroll visible (de l'apparition en bas à la disparition en haut)
            const totalScroll = rect.height + windowHeight;
            const currentScroll = windowHeight - rect.top;
            
            let progress = currentScroll / totalScroll;
            // On veut que l'animation commence un peu après l'apparition et finisse un peu avant
            progress = (progress - 0.2) / 0.6;
            progress = Math.max(0, Math.min(1, progress));
            
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        // Initialisation avec un petit délai pour être sûr que le SVG est rendu
        setTimeout(handleScroll, 100);
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center overflow-hidden py-10">
            <div className="w-full mx-auto px-4 flex">
                
                {/* Colonne de gauche avec l'animation SVG (cachée sur mobile) */}
                <div className="hidden lg:block w-24 relative flex-shrink-0 mr-8">
                    <svg viewBox="0 0 100 1000" className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none">
                        {/* Ligne de fond (claire) */}
                        <path 
                            d="M 50 0 C 90 250, 10 750, 50 1000" 
                            fill="none" 
                            stroke="#cccce8" 
                            strokeWidth="4" 
                            vectorEffect="non-scaling-stroke" 
                        />
                        {/* Ligne de progression (foncée) */}
                        <path 
                            ref={pathRef}
                            d="M 50 0 C 90 250, 10 750, 50 1000" 
                            fill="none" 
                            stroke="#7e7ea8" 
                            strokeWidth="4" 
                            vectorEffect="non-scaling-stroke"
                            strokeDasharray={pathLength}
                            strokeDashoffset={pathLength - (scrollProgress * pathLength)}
                        />
                    </svg>
                </div>

                {/* Grille de cartes (Bulles uniquement) */}
                <div className="flex-1 flex flex-col gap-6 md:gap-8 z-10">
                    
                    {/* Ligne 1 */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        {/* Carte 1 */}
                        <div className="w-full md:w-5/12 bg-[#d9daeb] border-[3px] border-[#7f7e9f] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-center text-gray-900 font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Ancienne grange<br/>complètement rénovée<br/>de 120m²
                        </div>
                        {/* Carte 2 */}
                        <div className="w-full md:w-7/12 bg-white border-[3px] border-[#7f7e9f] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-center text-gray-900 font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Au pied du Dévoluy, à 15 min des pistes<br/>de ski et 10 min de Veynes (tous<br/>commerces et supermarchés, Plan d'eau<br/>riche en activités, restaurants...)
                        </div>
                    </div>

                    {/* Ligne 2 */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        {/* Carte 3 */}
                        <div className="w-full md:w-7/12 bg-[#7f7e9f] border-[3px] border-[#b0b1cd] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-center text-white font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Un jardin clos, des jeux pour enfants, terrasse<br/>ombragée, barbecue vous attendent pour<br/>vous reposer au calme, profiter de bons<br/>moments en famille ou avec vos amis.
                        </div>
                        {/* Carte 4 */}
                        <div className="w-full md:w-5/12 bg-[#d9daeb] border-[3px] border-[#7f7e9f] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-center text-gray-900 font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Maison fraîche l'été et<br/>chaleureuse l'hiver avec son<br/>chauffage au sol.
                        </div>
                    </div>

                    {/* Ligne 3 */}
                    <div className="flex flex-col md:flex-row gap-6 items-stretch">
                        {/* Carte 5 */}
                        <div className="w-full md:w-4/12 bg-white border-[3px] border-[#7f7e9f] rounded-[3rem] py-8 px-6 flex items-center justify-center text-center text-gray-900 font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Borne de recharge<br/>électrique.
                        </div>
                        {/* Carte 6 */}
                        <div className="w-full md:w-8/12 bg-[#d9daeb] border-[3px] border-[#7f7e9f] rounded-[2.5rem] p-6 md:p-8 flex items-center justify-center text-center text-gray-900 font-medium text-lg leading-relaxed shadow-sm transition-transform hover:scale-[1.02]">
                            Cuisine équipée, 3 chambres (6 couchages),<br/>mezzanine avec coin détente et TV, grande<br/>salle de bain (douche à l'italienne, double<br/>vasque) et 2 WC indépendants.
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
