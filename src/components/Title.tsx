interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return (
    <div className="relative inline-flex items-center justify-center py-10 overflow-hidden">
      {/* Le H2 (grand texte en arrière-plan, noir, police standard). Il définit la largeur et hauteur de la boîte. */}
      <h2 
        className="text-[clamp(1.5rem,9vw,3rem)] md:text-7xl font-bold text-black uppercase tracking-tight select-none whitespace-nowrap"
      >
        {text}
      </h2>
      
      {/* Le Span (texte devant, police Tangerine, couleur secondary) est centré précisément sur le H2, décalé vers le bas */}
      <span 
        className="absolute left-1/2 -translate-x-1/2 translate-y-[clamp(0.75rem,4vw,1.5rem)] md:translate-y-6 z-10 text-[clamp(1.2rem,7vw,2.25rem)] md:text-6xl font-tangerine font-black tracking-normal text-secondary whitespace-nowrap"
        style={{ WebkitTextStroke: '0.5px currentColor' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
}
