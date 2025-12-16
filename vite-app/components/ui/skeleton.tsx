import React from "react";
import { clsx } from "clsx";

type SkeletonAnimation = "pulse" | "wave" | "shimmer" | "none";
type SkeletonRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
type SkeletonColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "custom";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  radius?: SkeletonRadius;
  color?: SkeletonColor;
  customColor?: string;
  children?: React.ReactNode;
  isLoaded?: boolean;
}

interface SkeletonTextProps {
  lines?: number;
  gap?: number;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
  lastLineWidth?: string;
}

interface SkeletonAvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}

interface SkeletonCardProps {
  hasImage?: boolean;
  imageHeight?: string | number;
  lines?: number;
  hasAvatar?: boolean;
  hasAction?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  hasHeader?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}

interface SkeletonListProps {
  items?: number;
  hasAvatar?: boolean;
  hasAction?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}


const radiusStyles: Record<SkeletonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const avatarSizes: Record<string, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-20 h-20",
};

const animationStyles: Record<SkeletonAnimation, string> = {
  pulse: "animate-pulse",
  wave: "skeleton-wave",
  shimmer: "skeleton-shimmer",
  none: "",
};

const colorStyles: Record<SkeletonColor, string> = {
  default: "bg-muted/60",
  primary: "bg-primary/20",
  secondary: "bg-secondary/20",
  success: "bg-success/20",
  warning: "bg-warning/20",
  danger: "bg-danger/20",
  custom: "",
};

// Base Skeleton component
export function Skeleton({
  className,
  width,
  height,
  animation = "pulse",
  radius = "md",
  color = "default",
  customColor,
  children,
  isLoaded = false,
}: SkeletonProps) {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <div
      className={clsx(
        color !== "custom" && colorStyles[color],
        radiusStyles[radius],
        animationStyles[animation],
        className
      )}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...(color === "custom" && customColor ? { backgroundColor: customColor } : {}),
      }}
    >
      {children && <div className="invisible">{children}</div>}
    </div>
  );
}

// Text skeleton with multiple lines
export function SkeletonText({
  lines = 3,
  gap = 3,
  className,
  animation = "pulse",
  color = "default",
  customColor,
  lastLineWidth = "60%",
}: SkeletonTextProps) {
  return (
    <div className={clsx("space-y-" + gap, className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          animation={animation}
          color={color}
          customColor={customColor}
          radius="sm"
          className="h-4"
          width={i === lines - 1 ? lastLineWidth : "100%"}
        />
      ))}
    </div>
  );
}

// Avatar skeleton
export function SkeletonAvatar({
  size = "md",
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      animation={animation}
      color={color}
      customColor={customColor}
      radius="full"
      className={clsx(avatarSizes[size], className)}
    />
  );
}

// Card skeleton
export function SkeletonCard({
  hasImage = true,
  imageHeight = 200,
  lines = 3,
  hasAvatar = false,
  hasAction = true,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: SkeletonCardProps) {
  return (
    <div
      className={clsx(
        "bg-card border border-border rounded-xl overflow-hidden",
        className
      )}
    >
      {hasImage && (
        <Skeleton
          animation={animation}
          color={color}
          customColor={customColor}
          radius="none"
          height={imageHeight}
          className="w-full"
        />
      )}
      <div className="p-4 space-y-4">
        {hasAvatar && (
          <div className="flex items-center gap-3">
            <SkeletonAvatar size="md" animation={animation} color={color} customColor={customColor} />
            <div className="flex-1 space-y-2">
              <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-24" />
              <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-16" />
            </div>
          </div>
        )}
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-5 w-3/4" />
        <SkeletonText lines={lines} animation={animation} color={color} customColor={customColor} />
        {hasAction && (
          <div className="flex gap-2 pt-2">
            <Skeleton animation={animation} color={color} customColor={customColor} radius="lg" className="h-9 w-20" />
            <Skeleton animation={animation} color={color} customColor={customColor} radius="lg" className="h-9 w-20" />
          </div>
        )}
      </div>
    </div>
  );
}


// Table skeleton
export function SkeletonTable({
  rows = 5,
  columns = 4,
  hasHeader = true,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: SkeletonTableProps) {
  return (
    <div className={clsx("w-full overflow-hidden rounded-xl border border-border", className)}>
      <table className="w-full">
        {hasHeader && (
          <thead className="bg-muted/30">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-4 py-3 text-left">
                  <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-20" />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t border-border/50">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  <Skeleton
                    animation={animation}
                    color={color}
                    customColor={customColor}
                    radius="sm"
                    className="h-4"
                    width={colIndex === 0 ? "70%" : colIndex === columns - 1 ? "50%" : "80%"}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// List skeleton
export function SkeletonList({
  items = 5,
  hasAvatar = true,
  hasAction = false,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: SkeletonListProps) {
  return (
    <div className={clsx("space-y-1", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg"
        >
          {hasAvatar && <SkeletonAvatar size="md" animation={animation} color={color} customColor={customColor} />}
          <div className="flex-1 space-y-2">
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-1/3" />
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-2/3" />
          </div>
          {hasAction && (
            <Skeleton animation={animation} color={color} customColor={customColor} radius="md" className="h-8 w-8" />
          )}
        </div>
      ))}
    </div>
  );
}

// Image skeleton
export function SkeletonImage({
  width,
  height,
  aspectRatio,
  className,
  animation = "pulse",
  radius = "lg",
  color = "default",
  customColor,
}: {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  className?: string;
  animation?: SkeletonAnimation;
  radius?: SkeletonRadius;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <Skeleton
      animation={animation}
      radius={radius}
      color={color}
      customColor={customColor}
      className={clsx("flex items-center justify-center", className)}
      width={width}
      height={height}
    >
      <svg
        className="w-10 h-10 text-muted-foreground/30"
        fill="currentColor"
        viewBox="0 0 24 24"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v10h16V7H4zm8 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM6 16l3-4 2 2 4-5 5 7H6z" />
      </svg>
    </Skeleton>
  );
}

// Button skeleton
export function SkeletonButton({
  size = "md",
  width,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  size?: "sm" | "md" | "lg";
  width?: string | number;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  const sizeStyles = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  };

  return (
    <Skeleton
      animation={animation}
      color={color}
      customColor={customColor}
      radius="lg"
      className={clsx(sizeStyles[size], className)}
      width={width || (size === "sm" ? 60 : size === "lg" ? 100 : 80)}
    />
  );
}

// Input skeleton
export function SkeletonInput({
  hasLabel = true,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  hasLabel?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("space-y-2", className)}>
      {hasLabel && (
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-20" />
      )}
      <Skeleton animation={animation} color={color} customColor={customColor} radius="lg" className="h-10 w-full" />
    </div>
  );
}


// Profile skeleton
export function SkeletonProfile({
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("space-y-6", className)}>
      {/* Cover */}
      <Skeleton animation={animation} color={color} customColor={customColor} radius="lg" className="h-32 w-full" />
      
      {/* Avatar & Info */}
      <div className="flex items-end gap-4 -mt-12 px-4">
        <SkeletonAvatar size="2xl" animation={animation} color={color} customColor={customColor} />
        <div className="flex-1 space-y-2 pb-2">
          <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-6 w-40" />
          <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-24" />
        </div>
        <SkeletonButton size="md" animation={animation} color={color} customColor={customColor} />
      </div>
      
      {/* Bio */}
      <div className="px-4">
        <SkeletonText lines={2} animation={animation} color={color} customColor={customColor} />
      </div>
      
      {/* Stats */}
      <div className="flex gap-6 px-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-5 w-12" />
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Article skeleton
export function SkeletonArticle({
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <article className={clsx("space-y-6", className)}>
      {/* Title */}
      <div className="space-y-3">
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-8 w-full" />
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-8 w-3/4" />
      </div>
      
      {/* Meta */}
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="sm" animation={animation} color={color} customColor={customColor} />
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-32" />
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-24" />
      </div>
      
      {/* Featured Image */}
      <SkeletonImage aspectRatio="16/9" className="w-full" animation={animation} color={color} customColor={customColor} />
      
      {/* Content */}
      <div className="space-y-4">
        <SkeletonText lines={4} animation={animation} color={color} customColor={customColor} />
        <SkeletonText lines={3} animation={animation} color={color} customColor={customColor} />
        <SkeletonText lines={5} animation={animation} color={color} customColor={customColor} />
      </div>
    </article>
  );
}

// Comment skeleton
export function SkeletonComment({
  hasReplies = false,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  hasReplies?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("space-y-4", className)}>
      <div className="flex gap-3">
        <SkeletonAvatar size="md" animation={animation} color={color} customColor={customColor} />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-24" />
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-16" />
          </div>
          <SkeletonText lines={2} animation={animation} color={color} customColor={customColor} lastLineWidth="80%" />
          <div className="flex gap-4 pt-1">
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-10" />
            <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-10" />
          </div>
        </div>
      </div>
      
      {hasReplies && (
        <div className="ml-12 pl-4 border-l-2 border-border space-y-4">
          <div className="flex gap-3">
            <SkeletonAvatar size="sm" animation={animation} color={color} customColor={customColor} />
            <div className="flex-1 space-y-2">
              <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-20" />
              <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Product skeleton
export function SkeletonProduct({
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("bg-card border border-border rounded-xl overflow-hidden", className)}>
      <SkeletonImage aspectRatio="1/1" radius="none" animation={animation} color={color} customColor={customColor} />
      <div className="p-4 space-y-3">
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-3/4" />
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-6 w-20" />
          <Skeleton animation={animation} color={color} customColor={customColor} radius="full" className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}

// Dashboard stat skeleton
export function SkeletonStat({
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("bg-card border border-border rounded-xl p-5 space-y-3", className)}>
      <div className="flex items-center justify-between">
        <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-24" />
        <Skeleton animation={animation} color={color} customColor={customColor} radius="md" className="h-8 w-8" />
      </div>
      <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-8 w-32" />
      <Skeleton animation={animation} color={color} customColor={customColor} radius="sm" className="h-3 w-20" />
    </div>
  );
}

// Form skeleton
export function SkeletonForm({
  fields = 4,
  hasSubmit = true,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  fields?: number;
  hasSubmit?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("space-y-5", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <SkeletonInput key={i} animation={animation} color={color} customColor={customColor} />
      ))}
      {hasSubmit && (
        <div className="flex gap-3 pt-2">
          <SkeletonButton size="md" width={100} animation={animation} color={color} customColor={customColor} />
          <SkeletonButton size="md" width={80} animation={animation} color={color} customColor={customColor} />
        </div>
      )}
    </div>
  );
}

// Navigation skeleton
export function SkeletonNav({
  items = 5,
  hasLogo = true,
  className,
  animation = "pulse",
  color = "default",
  customColor,
}: {
  items?: number;
  hasLogo?: boolean;
  className?: string;
  animation?: SkeletonAnimation;
  color?: SkeletonColor;
  customColor?: string;
}) {
  return (
    <div className={clsx("flex items-center justify-between p-4", className)}>
      {hasLogo && (
        <Skeleton animation={animation} color={color} customColor={customColor} radius="md" className="h-8 w-28" />
      )}
      <div className="flex items-center gap-6">
        {Array.from({ length: items }).map((_, i) => (
          <Skeleton key={i} animation={animation} color={color} customColor={customColor} radius="sm" className="h-4 w-16" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Skeleton animation={animation} color={color} customColor={customColor} radius="full" className="h-8 w-8" />
        <SkeletonAvatar size="sm" animation={animation} color={color} customColor={customColor} />
      </div>
    </div>
  );
}
