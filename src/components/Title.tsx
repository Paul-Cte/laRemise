interface TitleProps {
  text: string;
  as?: 'h2' | 'span';
}

export default function Title({ text, as = 'h2' }: TitleProps) {
  const Component = as;

  return (
    <div className="relative inline-flex items-center justify-center py-10 overflow-hidden">
      {/* Grand texte en arrière-plan (H2 pour les sections, span pour la navigation) */}
      <Component 
        className="text-[clamp(1.5rem,9vw,3rem)] md:text-7xl font-bold text-black uppercase tracking-tight select-none whitespace-nowrap"
      >
        {text}
      </Component>
      
      {/* Le Span (texte devant, police Tangerine, couleur secondary) est centré précisément, décalé vers le bas */}
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
