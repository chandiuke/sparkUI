"use client";

import { useState } from "react";
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
  disabled?: boolean;
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
  disabled: disabledProp,
  fullWidth,
  className,
}: HoverFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigateTo, phase } = useTransition();
  const pathname = usePathname();

  const isNavigating = phase !== "idle";
  const isActive = href ? pathname === href : false;
  const isDisabled = isNavigating || isActive || disabledProp;

  const handleClick = () => {
    if (href && !isDisabled) {
      navigateTo(href);
    }
  };

  // Premium cubic-bezier for smooth, snappy feel
  const easing = "cubic-bezier(0.4, 0, 0.2, 1)";
  const duration = "280ms";

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      disabled={isDisabled}
      fullWidth={fullWidth}
      onClick={href ? handleClick : undefined}
      className={clsx("relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="relative flex flex-col h-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      >
        <span 
          className="flex items-center justify-center h-full will-change-transform"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
            transition: `transform ${duration} ${easing}`,
          }}
        >
          {text}
        </span>
        <span 
          className="absolute inset-0 flex items-center justify-center h-full will-change-transform"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
            transition: `transform ${duration} ${easing}`,
          }}
        >
          {hoverText}
        </span>
      </span>
    </Button>
  );
}
