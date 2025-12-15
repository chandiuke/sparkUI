"use client";

import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

type ChipVariant = "solid" | "bordered" | "flat" | "dot" | "faded";
type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
type ChipSize = "sm" | "md" | "lg";
type ChipRadius = "none" | "sm" | "md" | "lg" | "full";

interface BaseChipProps {
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  radius?: ChipRadius;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  avatar?: React.ReactNode;
  onClose?: () => void;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ChipAsSpan extends BaseChipProps {
  as?: "span";
  onClick?: () => void;
  href?: never;
}

interface ChipAsLink extends BaseChipProps {
  as: "a";
  href: string;
  onClick?: () => void;
}

export type ChipProps = ChipAsSpan | ChipAsLink;

const variantStyles: Record<ChipVariant, Record<ChipColor, string>> = {
  solid: {
    default: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    danger: "bg-danger text-danger-foreground",
  },
  bordered: {
    default: "border-2 border-border text-foreground bg-transparent",
    primary: "border-2 border-primary text-primary bg-transparent",
    secondary: "border-2 border-secondary text-secondary bg-transparent",
    success: "border-2 border-success text-success bg-transparent",
    warning: "border-2 border-warning text-warning bg-transparent",
    danger: "border-2 border-danger text-danger bg-transparent",
  },
  flat: {
    default: "bg-muted/50 text-foreground",
    primary: "bg-primary/15 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-danger/15 text-danger",
  },
  faded: {
    default: "bg-muted/30 text-foreground border border-border",
    primary: "bg-primary/10 text-primary border border-primary/30",
    secondary: "bg-secondary/10 text-secondary border border-secondary/30",
    success: "bg-success/10 text-success border border-success/30",
    warning: "bg-warning/10 text-warning border border-warning/30",
    danger: "bg-danger/10 text-danger border border-danger/30",
  },
  dot: {
    default: "bg-transparent text-foreground border border-border",
    primary: "bg-transparent text-foreground border border-border",
    secondary: "bg-transparent text-foreground border border-border",
    success: "bg-transparent text-foreground border border-border",
    warning: "bg-transparent text-foreground border border-border",
    danger: "bg-transparent text-foreground border border-border",
  },
};

const selectedStyles: Record<ChipColor, string> = {
  default: "ring-2 ring-foreground/50 ring-offset-1 ring-offset-background",
  primary: "ring-2 ring-primary ring-offset-1 ring-offset-background",
  secondary: "ring-2 ring-secondary ring-offset-1 ring-offset-background",
  success: "ring-2 ring-success ring-offset-1 ring-offset-background",
  warning: "ring-2 ring-warning ring-offset-1 ring-offset-background",
  danger: "ring-2 ring-danger ring-offset-1 ring-offset-background",
};

const dotColors: Record<ChipColor, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const sizeStyles: Record<ChipSize, string> = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-sm gap-1.5",
  lg: "h-8 px-3 text-sm gap-2",
};

const radiusStyles: Record<ChipRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const closeButtonSizes: Record<ChipSize, string> = {
  sm: "w-3 h-3",
  md: "w-3.5 h-3.5",
  lg: "w-4 h-4",
};

const avatarSizes: Record<ChipSize, string> = {
  sm: "w-4 h-4 -ml-1",
  md: "w-5 h-5 -ml-1",
  lg: "w-6 h-6 -ml-1.5",
};

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Chip({
  variant = "solid",
  color = "default",
  size = "md",
  radius = "full",
  startContent,
  endContent,
  avatar,
  onClose,
  onClick,
  disabled = false,
  selected = false,
  className,
  children,
  ...props
}: ChipProps) {
  const isClickable = !!onClick || props.as === "a";
  
  const baseStyles = clsx(
    "inline-flex items-center font-medium",
    variantStyles[variant][color],
    sizeStyles[size],
    radiusStyles[radius],
    disabled && "opacity-50 pointer-events-none",
    selected && selectedStyles[color],
    isClickable && "cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95",
    isClickable && !disabled && "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    className
  );

  const content = (
    <>
      {selected && !avatar && !startContent && variant !== "dot" && (
        <CheckIcon className={clsx(closeButtonSizes[size], "-ml-0.5")} />
      )}
      {avatar && (
        <span className={clsx("rounded-full overflow-hidden shrink-0", avatarSizes[size])}>
          {avatar}
        </span>
      )}
      {variant === "dot" && (
        <span className={clsx("w-2 h-2 rounded-full shrink-0", dotColors[color])} />
      )}
      {startContent}
      <span className="truncate">{children}</span>
      {endContent}
      {onClose && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          aria-label="Remove"
        >
          <CloseIcon className={closeButtonSizes[size]} />
        </button>
      )}
    </>
  );

  const motionProps = {
    layout: true,
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
    transition: { duration: 0.2 },
  };

  if (props.as === "a") {
    return (
      <motion.a
        {...motionProps}
        href={props.href}
        onClick={onClick}
        className={baseStyles}
        aria-disabled={disabled || undefined}
      >
        {content}
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        {...motionProps}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={selected}
        className={baseStyles}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.span {...motionProps} className={baseStyles}>
      {content}
    </motion.span>
  );
}

// Export AnimatePresence for use with closeable chips
export { AnimatePresence };
