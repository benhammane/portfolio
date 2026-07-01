import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const liquidButtonVariants = cva(
  "relative inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap text-sm font-medium transition-[color,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        brand: "text-brand hover:text-brand/80 duration-300 hover:scale-[1.03]",
        ghost: "text-foreground/80 hover:text-foreground duration-300 hover:scale-[1.03]",
        amber: "text-amber-400 hover:text-amber-300 duration-300 hover:scale-[1.03]",
      },
      size: {
        sm:   "h-9  px-5  py-2   text-xs rounded-full",
        md:   "h-11 px-6  py-3   rounded-full",
        lg:   "h-12 px-8  py-3.5 rounded-full",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "md",
    },
  }
)

const glassRing =
  "absolute inset-0 rounded-full transition-all " +
  "shadow-[0_0_6px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.10)," +
  "inset_2px_2px_0.5px_-3px_rgba(255,255,255,0.7)," +
  "inset_-2px_-2px_0.5px_-3px_rgba(255,255,255,0.4)," +
  "inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.5)," +
  "inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.3)," +
  "inset_0_0_8px_6px_rgba(22,224,196,0.07)," +
  "inset_0_0_2px_2px_rgba(255,255,255,0.05)," +
  "0_0_14px_rgba(22,224,196,0.12)] " +
  "dark:shadow-[0_0_8px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.14)," +
  "inset_2px_2px_0.5px_-3.5px_rgba(255,255,255,0.12)," +
  "inset_-2px_-2px_0.5px_-3.5px_rgba(255,255,255,0.70)," +
  "inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.55)," +
  "inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.45)," +
  "inset_0_0_8px_6px_rgba(22,224,196,0.10)," +
  "inset_0_0_2px_2px_rgba(255,255,255,0.07)," +
  "0_0_14px_rgba(22,224,196,0.18)]"

/** Éléments visuels partagés entre <button> et <a>. */
function GlassInternals({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className={glassRing} />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden rounded-full"
        style={{ backdropFilter: 'url("#liquid-glass-filter")' }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <GlassFilter />
    </>
  )
}

// ── Props communes ───────────────────────────────────────────────────────────

type BaseVariants = VariantProps<typeof liquidButtonVariants>

// ── Surcharge button ─────────────────────────────────────────────────────────

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseVariants {
  href?: undefined
}

// ── Surcharge link ───────────────────────────────────────────────────────────

export interface LiquidLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    BaseVariants {
  href: string
}

export type LiquidButtonOrLinkProps = LiquidButtonProps | LiquidLinkProps

/** Bouton liquid-glass : rendu `<button>` ou `<a>` selon la présence de `href`. */
export const LiquidButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  LiquidButtonOrLinkProps
>(({ className, variant, size, children, ...rest }, ref) => {
  const cls = cn(liquidButtonVariants({ variant, size, className }))

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as LiquidLinkProps
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...anchorRest}
      >
        <GlassInternals>{children}</GlassInternals>
      </a>
    )
  }

  const buttonRest = rest as LiquidButtonProps
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...buttonRest}
    >
      <GlassInternals>{children}</GlassInternals>
    </button>
  )
})
LiquidButton.displayName = "LiquidButton"

function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.06" numOctaves="1" seed="3" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="1.5" result="blurNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurNoise" scale="55" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
