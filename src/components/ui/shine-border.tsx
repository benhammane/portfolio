import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children: ReactNode;
}

/**
 * Bordure animée : anneau conique complet (toutes les couleurs visibles en permanence),
 * qui tourne en boucle — même technique que l'anneau de la photo du Hero (bien visible),
 * plutôt qu'un simple point lumineux qui balaie un dégradé radial (trop discret sur fond sombre).
 */
export function ShineBorder({
  borderRadius = 24,
  borderWidth = 2.5,
  duration = 8,
  color = ['hsl(var(--brand))', 'hsl(var(--brand-2))', 'hsl(var(--brand-3))'],
  className,
  children,
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color : [color];
  // Referme la boucle du dégradé conique (dernier stop = premier) pour éviter une coupure visible.
  const conicGradient = `conic-gradient(from 0deg, ${[...colors, colors[0]].join(', ')})`;

  return (
    <div
      style={{ '--border-radius': `${borderRadius}px` } as CSSProperties}
      className={cn('relative w-full rounded-[--border-radius]', className)}
    >
      {/* Anneau masqué : ne laisse voir que l'épaisseur `borderWidth`, le centre est découpé */}
      <div
        style={
          {
            padding: `${borderWidth}px`,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          } as CSSProperties
        }
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[--border-radius]"
      >
        <div
          style={{
            backgroundImage: conicGradient,
            animationDuration: `${duration}s`,
          }}
          className="absolute -inset-1/2 motion-safe:animate-spin-slow"
        />
      </div>
      {children}
    </div>
  );
}
