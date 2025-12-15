import React, { useState } from "react";
import { clsx } from "clsx";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarRadius = "none" | "sm" | "md" | "lg" | "full";
type AvatarColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  icon?: React.ReactNode;
  size?: AvatarSize;
  radius?: AvatarRadius;
  color?: AvatarColor;
  bordered?: boolean;
  gradientBorder?: boolean;
  zoomed?: boolean;
  disabled?: boolean;
  showFallback?: boolean;
  fallback?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  bordered?: boolean;
  blurOnHover?: boolean;
  className?: string;
}

const sizeConfig = {
  xs: { container: "w-6 h-6", text: "text-[10px]", icon: "w-3 h-3" },
  sm: { container: "w-8 h-8", text: "text-xs", icon: "w-4 h-4" },
  md: { container: "w-10 h-10", text: "text-sm", icon: "w-5 h-5" },
  lg: { container: "w-14 h-14", text: "text-lg", icon: "w-6 h-6" },
  xl: { container: "w-20 h-20", text: "text-2xl", icon: "w-8 h-8" },
};

const radiusConfig = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const colorConfig = {
  default: { bg: "bg-muted", text: "text-foreground", border: "ring-foreground/20" },
  primary: { bg: "bg-primary", text: "text-primary-foreground", border: "ring-primary" },
  secondary: { bg: "bg-secondary", text: "text-secondary-foreground", border: "ring-secondary" },
  success: { bg: "bg-success", text: "text-success-foreground", border: "ring-success" },
  warning: { bg: "bg-warning", text: "text-warning-foreground", border: "ring-warning" },
  danger: { bg: "bg-danger", text: "text-danger-foreground", border: "ring-danger" },
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Default user icon
const DefaultIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const gradientBorderConfig = {
  default: "from-foreground/50 to-foreground/20",
  primary: "from-primary via-purple-500 to-pink-500",
  secondary: "from-secondary via-blue-500 to-cyan-500",
  success: "from-success via-emerald-400 to-teal-500",
  warning: "from-warning via-orange-400 to-red-500",
  danger: "from-danger via-rose-500 to-pink-500",
};

export function Avatar({
  src,
  alt = "",
  name,
  icon,
  size = "md",
  radius = "full",
  color = "default",
  bordered = false,
  gradientBorder = false,
  zoomed = false,
  disabled = false,
  showFallback = true,
  fallback,
  onClick,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const showImage = src && !imgError;
  const showInitials = !showImage && name && showFallback;
  const showIcon = !showImage && !showInitials && showFallback;
  const showCustomFallback = !showImage && fallback;

  const avatarContent = (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center overflow-hidden flex-shrink-0",
        "transition-all duration-200",
        sizeConfig[size].container,
        radiusConfig[radius],
        colorConfig[color].bg,
        !showImage && colorConfig[color].text,
        bordered && !gradientBorder && "ring-2 ring-offset-2 ring-offset-background",
        bordered && !gradientBorder && colorConfig[color].border,
        disabled && "opacity-50 cursor-not-allowed",
        onClick && !disabled && !gradientBorder && "cursor-pointer",
        zoomed && "group",
        className
      )}
      onClick={!disabled && !gradientBorder ? onClick : undefined}
    >
      {/* Image */}
      {src && !imgError && (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          onError={() => setImgError(true)}
          className={clsx(
            "w-full h-full object-cover",
            zoomed && "transition-transform duration-300 group-hover:scale-110"
          )}
        />
      )}

      {/* Custom fallback */}
      {showCustomFallback && fallback}

      {/* Initials fallback */}
      {showInitials && !fallback && (
        <span className={clsx("font-semibold select-none", sizeConfig[size].text)}>
          {getInitials(name)}
        </span>
      )}

      {/* Icon fallback */}
      {showIcon && !fallback && (
        icon || <DefaultIcon className={sizeConfig[size].icon} />
      )}
    </div>
  );

  // Wrap with gradient border if needed
  if (gradientBorder) {
    return (
      <div
        className={clsx(
          "relative inline-flex p-[2px] bg-gradient-to-r",
          gradientBorderConfig[color],
          radiusConfig[radius],
          onClick && !disabled && "cursor-pointer"
        )}
        onClick={!disabled ? onClick : undefined}
      >
        {avatarContent}
      </div>
    );
  }

  return avatarContent;
}

export function AvatarGroup({
  children,
  max = 5,
  size = "md",
  bordered = true,
  blurOnHover = false,
  className,
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={clsx("group/avatars flex items-center -space-x-2", className)}>
      {visibleChildren.map((child, index) => {
        if (React.isValidElement<AvatarProps>(child)) {
          return (
            <div
              key={index}
              className={clsx(
                "transition-all duration-200 hover:scale-110 hover:z-10 hover:-translate-y-1",
                blurOnHover && "hover:!blur-none group-hover/avatars:blur-[2px]"
              )}
            >
              {React.cloneElement(child, {
                size: child.props.size || size,
                bordered: child.props.bordered ?? bordered,
                className: clsx(child.props.className, "ring-background cursor-pointer"),
              })}
            </div>
          );
        }
        return child;
      })}

      {remainingCount > 0 && (
        <div
          className={clsx(
            "relative inline-flex items-center justify-center",
            "bg-muted text-muted-foreground font-semibold",
            "transition-all duration-200 hover:scale-110 hover:z-10",
            sizeConfig[size].container,
            sizeConfig[size].text,
            "rounded-full cursor-pointer",
            bordered && "ring-2 ring-background",
            blurOnHover && "hover:!blur-none group-hover/avatars:blur-[2px]"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

// Badge/Status indicator for Avatar
interface AvatarBadgeProps {
  children: React.ReactNode;
  status?: "online" | "offline" | "away" | "busy";
  badge?: React.ReactNode;
  badgeColor?: AvatarColor;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

const statusColors = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-danger",
};

const placementConfig = {
  "top-right": "top-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-left": "bottom-0 left-0",
};

export function AvatarWithBadge({
  children,
  status,
  badge,
  badgeColor = "primary",
  placement = "bottom-right",
  className,
}: AvatarBadgeProps) {
  return (
    <div className={clsx("relative inline-block", className)}>
      {children}
      {/* Status dot */}
      {status && !badge && (
        <span
          className={clsx(
            "absolute w-3 h-3 rounded-full ring-2 ring-background",
            statusColors[status],
            placementConfig[placement]
          )}
        />
      )}
      {/* Custom badge content */}
      {badge && (
        <span
          className={clsx(
            "absolute flex items-center justify-center min-w-[18px] h-[18px] px-1",
            "text-[10px] font-bold rounded-full ring-2 ring-background",
            colorConfig[badgeColor].bg,
            colorConfig[badgeColor].text,
            placementConfig[placement]
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
