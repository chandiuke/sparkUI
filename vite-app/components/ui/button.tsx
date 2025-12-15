import { forwardRef, useState } from "react";
import { clsx } from "clsx";

type ButtonVariant =
  | "solid"
  | "bordered"
  | "outline"
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
type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-lg";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

interface BaseButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  disabled?: boolean;
  loading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

type ButtonAsButton = BaseButtonProps & {
  as?: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type ButtonAsAnchor = BaseButtonProps & {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    default: "bg-muted text-foreground hover:bg-muted/80",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    success: "bg-success text-success-foreground hover:bg-success/90",
    warning: "bg-warning text-warning-foreground hover:bg-warning/90",
    danger: "bg-danger text-danger-foreground hover:bg-danger/90",
  },
  bordered: {
    default: "border-2 border-border text-foreground hover:opacity-80",
    primary: "border-2 border-primary text-primary hover:opacity-80",
    secondary: "border-2 border-secondary text-secondary hover:opacity-80",
    success: "border-2 border-success text-success hover:opacity-80",
    warning: "border-2 border-warning text-warning hover:opacity-80",
    danger: "border-2 border-danger text-danger hover:opacity-80",
  },
  outline: {
    default: "border border-border text-foreground hover:bg-muted/50",
    primary: "border border-primary text-primary hover:bg-primary/10",
    secondary: "border border-secondary text-secondary hover:bg-secondary/10",
    success: "border border-success text-success hover:bg-success/10",
    warning: "border border-warning text-warning hover:bg-warning/10",
    danger: "border border-danger text-danger hover:bg-danger/10",
  },
  faded: {
    default:
      "border-2 border-border text-foreground hover:bg-foreground hover:text-background hover:border-foreground",
    primary:
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary",
    secondary:
      "border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary",
    success:
      "border-2 border-success text-success hover:bg-success hover:text-success-foreground hover:border-success",
    warning:
      "border-2 border-warning text-warning hover:bg-warning hover:text-warning-foreground hover:border-warning",
    danger:
      "border-2 border-danger text-danger hover:bg-danger hover:text-danger-foreground hover:border-danger",
  },
  flat: {
    default: "bg-muted/50 text-foreground hover:bg-muted",
    primary: "bg-primary/10 text-primary hover:bg-primary/20",
    secondary: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    success: "bg-success/10 text-success hover:bg-success/20",
    warning: "bg-warning/10 text-warning hover:bg-warning/20",
    danger: "bg-danger/10 text-danger hover:bg-danger/20",
  },
  ghost: {
    default: "text-foreground hover:bg-muted",
    primary: "text-primary hover:bg-primary/10",
    secondary: "text-secondary hover:bg-secondary/10",
    success: "text-success hover:bg-success/10",
    warning: "text-warning hover:bg-warning/10",
    danger: "text-danger hover:bg-danger/10",
  },
  shadow: {
    default:
      "bg-muted text-foreground shadow-lg shadow-foreground/10 hover:shadow-foreground/20",
    primary:
      "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/40",
    secondary:
      "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 hover:shadow-secondary/40",
    success:
      "bg-success text-success-foreground shadow-lg shadow-success/30 hover:shadow-success/40",
    warning:
      "bg-warning text-warning-foreground shadow-lg shadow-warning/30 hover:shadow-warning/40",
    danger:
      "bg-danger text-danger-foreground shadow-lg shadow-danger/30 hover:shadow-danger/40",
  },
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
  icon: "h-10 w-10 p-0",
  "icon-sm": "h-8 w-8 p-0",
  "icon-lg": "h-12 w-12 p-0",
};

const radiusStyles: Record<ButtonRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={clsx("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "solid",
      color = "default",
      size = "md",
      radius = "md",
      disabled = false,
      loading = false,
      startContent,
      endContent,
      fullWidth = false,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const baseStyles = clsx(
      "inline-flex items-center justify-center font-medium cursor-pointer select-none",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
      variantStyles[variant][color],
      sizeStyles[size],
      radiusStyles[radius],
      fullWidth && "w-full",
      (disabled || loading) && "pointer-events-none opacity-50",
      className,
    );

    const spinnerSize =
      size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4";

    const content = (
      <>
        {loading ? <Spinner className={spinnerSize} /> : startContent}
        {children}
        {!loading && endContent}
      </>
    );

    const scaleStyle = {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition:
        "transform 0.1s ease-out, background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, opacity 0.25s ease, box-shadow 0.25s ease",
      willChange: "transform, background-color",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    };

    const pressHandlers = {
      onMouseDown: () => setIsPressed(true),
      onMouseUp: () => setIsPressed(false),
      onMouseLeave: handleMouseLeave,
      onMouseEnter,
      onTouchStart: () => setIsPressed(true),
      onTouchEnd: () => setIsPressed(false),
    };

    if (props.as === "a") {
      const anchorProps = props as ButtonAsAnchor;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={anchorProps.href}
          target={anchorProps.target}
          rel={anchorProps.rel}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          className={baseStyles}
          style={scaleStyle}
          onClick={anchorProps.onClick}
          {...pressHandlers}
        >
          {content}
        </a>
      );
    }

    const buttonProps = props as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonProps.type || "button"}
        className={baseStyles}
        style={scaleStyle}
        disabled={disabled || loading}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        aria-live={loading ? "polite" : undefined}
        onClick={buttonProps.onClick}
        {...pressHandlers}
      >
        {loading && <span className="sr-only">Loading</span>}
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
