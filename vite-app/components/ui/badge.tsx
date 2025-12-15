import { clsx } from "clsx";

type BadgeVariant = "solid" | "flat" | "bordered" | "dot" | "glow" | "glass";
type BadgeColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type BadgeSize = "sm" | "md" | "lg";
type BadgeRadius = "none" | "sm" | "md" | "lg" | "full";
type BadgePlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface BadgeProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
  placement?: BadgePlacement;
  invisible?: boolean;
  showZero?: boolean;
  max?: number;
  ping?: boolean;
  outline?: boolean;
  className?: string;
  badgeClassName?: string;
}

interface StandaloneBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  radius?: BadgeRadius;
  dot?: boolean;
  ping?: boolean;
  outline?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, Record<BadgeColor, string>> = {
  solid: {
    default: "bg-muted text-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    danger: "bg-danger text-danger-foreground",
  },
  flat: {
    default: "bg-muted/50 text-foreground",
    primary: "bg-primary/15 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-danger/15 text-danger",
  },
  bordered: {
    default: "bg-transparent border-2 border-muted-foreground text-foreground",
    primary: "bg-transparent border-2 border-primary text-primary",
    secondary: "bg-transparent border-2 border-secondary text-secondary",
    success: "bg-transparent border-2 border-success text-success",
    warning: "bg-transparent border-2 border-warning text-warning",
    danger: "bg-transparent border-2 border-danger text-danger",
  },
  dot: {
    default: "bg-muted-foreground",
    primary: "bg-primary",
    secondary: "bg-secondary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  },
  glow: {
    default: "bg-muted text-foreground shadow-lg shadow-foreground/20",
    primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/40",
    secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/40",
    success: "bg-success text-success-foreground shadow-lg shadow-success/40",
    warning: "bg-warning text-warning-foreground shadow-lg shadow-warning/40",
    danger: "bg-danger text-danger-foreground shadow-lg shadow-danger/40",
  },
  glass: {
    default: "backdrop-blur-md bg-white/30 dark:bg-black/40 border border-white/30 dark:border-white/10 text-foreground",
    primary: "backdrop-blur-md bg-primary/20 border border-primary/30 text-foreground",
    secondary: "backdrop-blur-md bg-secondary/20 border border-secondary/30 text-foreground",
    success: "backdrop-blur-md bg-success/20 border border-success/30 text-foreground",
    warning: "backdrop-blur-md bg-warning/20 border border-warning/30 text-foreground",
    danger: "backdrop-blur-md bg-danger/20 border border-danger/30 text-foreground",
  },
};

const sizeStyles = {
  sm: "min-w-[18px] h-[18px] text-[10px] px-1",
  md: "min-w-[22px] h-[22px] text-xs px-1.5",
  lg: "min-w-[26px] h-[26px] text-sm px-2",
};

const dotSizeStyles = {
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
};

const radiusStyles: Record<BadgeRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const placementStyles: Record<BadgePlacement, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
};

const standaloneSizeStyles = {
  sm: "h-5 text-xs px-2 gap-1",
  md: "h-6 text-xs px-2.5 gap-1.5",
  lg: "h-7 text-sm px-3 gap-2",
};

export function Badge({
  children,
  content,
  variant = "solid",
  color = "danger",
  size = "md",
  radius = "full",
  placement = "top-right",
  invisible = false,
  showZero = false,
  max = 99,
  ping = false,
  outline = true,
  className,
  badgeClassName,
}: BadgeProps) {
  const displayContent = typeof content === "number" 
    ? (content === 0 && !showZero ? null : content > max ? `${max}+` : content)
    : content;

  const isDot = variant === "dot" || displayContent === undefined || displayContent === null;
  const shouldShow = !invisible && (isDot || displayContent !== null);

  if (!children) {
    return null;
  }

  const pingColorClass = variant === "glass" 
    ? variantStyles.flat[color] 
    : variantStyles.solid[color];

  return (
    <div className={clsx("relative", className)}>
      {children}
      
      {shouldShow && (
        <span
          className={clsx(
            "absolute flex items-center justify-center font-semibold z-10",
            "transition-all duration-200",
            isDot ? dotSizeStyles[size] : sizeStyles[size],
            isDot ? "rounded-full" : radiusStyles[radius],
            variantStyles[variant][color],
            placementStyles[placement],
            outline && variant !== "glass" && "ring-2 ring-background",
            badgeClassName
          )}
        >
          {ping && (
            <span
              className={clsx(
                "absolute inset-0 rounded-full animate-ping opacity-75",
                pingColorClass
              )}
            />
          )}
          
          {!isDot && displayContent}
        </span>
      )}
    </div>
  );
}

export function BadgeLabel({
  children,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "full",
  dot = false,
  ping = false,
  outline = false,
  startContent,
  endContent,
  onClose,
  className,
}: StandaloneBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium",
        standaloneSizeStyles[size],
        radiusStyles[radius],
        variantStyles[variant === "dot" ? "flat" : variant][color],
        outline && variant !== "bordered" && "ring-1 ring-current/20",
        className
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {ping && (
            <span
              className={clsx(
                "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
                variantStyles.dot[color]
              )}
            />
          )}
          <span
            className={clsx(
              "relative inline-flex rounded-full h-2 w-2",
              variantStyles.dot[color]
            )}
          />
        </span>
      )}
      
      {startContent}
      <span className="truncate">{children}</span>
      {endContent}
      
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-0.5 -mr-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Remove"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}
