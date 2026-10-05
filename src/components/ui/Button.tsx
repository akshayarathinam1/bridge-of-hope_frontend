import { type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { clsx } from "clsx";

type Variant = "primary" | "outline" | "outline-white" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  fullWidth?: boolean;
}

const base =
  "relative overflow-hidden group inline-flex items-center justify-center gap-2 font-bold rounded-full border-2 transition-all duration-300 cursor-pointer whitespace-nowrap leading-none select-none hover:-translate-y-0.5 active:translate-y-0 before:absolute before:inset-0 before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-in-out before:pointer-events-none [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-0.5 hover:[&>svg]:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red border-brand-red text-white shadow-[0_4px_16px_rgba(255,113,0,0.35)] hover:bg-brand-red-dark hover:border-brand-red-dark hover:shadow-[0_8px_26px_rgba(255,113,0,0.5)]",
  outline:
    "bg-transparent border-brand-black text-brand-black hover:bg-brand-black hover:text-white hover:shadow-[0_4px_16px_rgba(3,42,106,0.2)]",
  "outline-white":
    "bg-transparent border-white/70 text-white hover:bg-white hover:text-brand-black hover:border-white hover:shadow-[0_4px_16px_rgba(255,255,255,0.25)]",
  ghost:
    "bg-transparent border-transparent text-brand-red hover:bg-brand-red-light",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-[0.9375rem]",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
