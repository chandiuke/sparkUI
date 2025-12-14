"use client";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useTransition } from "./transition-context";

type ButtonVariant = "solid" | "bordered" | "flat" | "ghost" | "shadow";
type ButtonColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type ButtonSize = "sm" | "md" | "lg";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

interface TransitionButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  className?: string;
}

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    default: "bg-default-100 text-default-foreground hover:bg-default-200",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    success: "bg-success text-success-foreground hover:bg-success/90",
    warning: "bg-warning text-warning-foreground hover:bg-warning/90",
    danger: "bg-danger text-danger-foreground hover:bg-danger/90",
  },
  bordered: {
    default: "border-2 border-default-300 text-foreground hover:bg-default-100",
    primary: "border-2 border-primary text-primary hover:bg-primary/10",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary/10",
    success: "border-2 border-success text-success hover:bg-success/10",
    warning: "border-2 border-warning text-warning hover:bg-warning/10",
    danger: "border-2 border-danger text-danger hover:bg-danger/10",
  },
  flat: {
    default: "bg-default-100 text-default-foreground hover:bg-default-200",
    primary: "bg-primary/20 text-primary hover:bg-primary/30",
    secondary: "bg-secondary/20 text-secondary hover:bg-secondary/30",
    success: "bg-success/20 text-success hover:bg-success/30",
    warning: "bg-warning/20 text-warning hover:bg-warning/30",
    danger: "bg-danger/20 text-danger hover:bg-danger/30",
  },
  ghost: {
    default: "text-default-foreground hover:bg-default-100",
    primary: "text-primary hover:bg-primary/10",
    secondary: "text-secondary hover:bg-secondary/10",
    success: "text-success hover:bg-success/10",
    warning: "text-warning hover:bg-warning/10",
    danger: "text-danger hover:bg-danger/10",
  },
  shadow: {
    default: "bg-default-100 text-default-foreground shadow-lg shadow-default/50 hover:shadow-default/40",
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-primary/30",
    secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/40 hover:shadow-secondary/30",
    success: "bg-success text-success-foreground shadow-lg shadow-success/40 hover:shadow-success/30",
    warning: "bg-warning text-warning-foreground shadow-lg shadow-warning/40 hover:shadow-warning/30",
    danger: "bg-danger text-danger-foreground shadow-lg shadow-danger/40 hover:shadow-danger/30",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-base gap-2",
  lg: "h-12 px-6 text-lg gap-2.5",
};

const radiusStyles: Record<ButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export function TransitionButton({
  href,
  children,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "md",
  className,
}: TransitionButtonProps) {
  const { navigateTo, phase } = useTransition();
  const pathname = usePathname();

  const isNavigating = phase !== "idle";
  const isActive = pathname === href;
  const isDisabled = isNavigating || isActive;

  const handleClick = () => {
    if (!isDisabled) {
      navigateTo(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "active:scale-[0.97]",
        variantStyles[variant][color],
        sizeStyles[size],
        radiusStyles[radius],
        isDisabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
