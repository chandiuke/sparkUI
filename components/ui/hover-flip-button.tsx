"use client";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";

type ButtonVariant =
  | "solid"
  | "bordered"
  | "faded"
  | "flat"
  | "ghost"
  | "shadow";
type ButtonColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

interface HoverFlipButtonProps {
  text: string;
  hoverText: string;
  href?: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  isDisabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function HoverFlipButton({
  text,
  hoverText,
  href,
  variant,
  color,
  size,
  radius,
  isDisabled: isDisabledProp,
  fullWidth,
  className,
}: HoverFlipButtonProps) {
  const { navigateTo, phase } = useTransition();
  const pathname = usePathname();

  const isNavigating = phase !== "idle";
  const isActive = href ? pathname === href : false;
  const isDisabled = isNavigating || isActive || isDisabledProp;

  const handleClick = () => {
    if (href && !isDisabled) {
      navigateTo(href);
    }
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      isDisabled={isDisabled}
      fullWidth={fullWidth}
      onClick={href ? handleClick : undefined}
      className={clsx("relative overflow-hidden group", className)}
    >
      <span
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      >
        <span className="flex items-center justify-center h-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute inset-0 flex items-center justify-center h-full translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          {hoverText}
        </span>
      </span>
    </Button>
  );
}
