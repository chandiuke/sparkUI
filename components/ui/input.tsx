"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "bordered" | "underlined";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  label?: string;
  labelPlacement?: "inside" | "outside";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isDisabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const sizeStyles = {
  sm: "h-8 text-sm",
  md: "h-10 text-base",
  lg: "h-12 text-lg",
};

const radiusStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      variant = "flat",
      radius = "md",
      label,
      labelPlacement = "inside",
      startContent,
      endContent,
      isDisabled,
      isInvalid,
      errorMessage,
      className,
      ...props
    },
    ref,
  ) => {
    const wrapperStyles = clsx(
      "relative flex items-center gap-2 px-3 transition-colors",
      sizeStyles[size],
      radiusStyles[radius],
      variant === "flat" && "bg-default-100 hover:bg-default-200",
      variant === "bordered" &&
        "border-2 border-default-300 hover:border-default-400 bg-transparent",
      variant === "underlined" &&
        "border-b-2 border-default-300 hover:border-default-400 bg-transparent rounded-none",
      isInvalid && "border-danger bg-danger/10",
      isDisabled && "opacity-50 pointer-events-none",
      "focus-within:ring-2 focus-within:ring-primary",
    );

    return (
      <div className={clsx("flex flex-col gap-1.5", className)}>
        {label && labelPlacement === "outside" && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}
        <div className={wrapperStyles}>
          {startContent && (
            <span className="text-default-400 flex-shrink-0">
              {startContent}
            </span>
          )}
          <input
            ref={ref}
            disabled={isDisabled}
            className={clsx(
              "flex-1 bg-transparent outline-none",
              "placeholder:text-default-400",
              "disabled:cursor-not-allowed",
            )}
            {...props}
          />
          {endContent && (
            <span className="text-default-400 flex-shrink-0">{endContent}</span>
          )}
        </div>
        {isInvalid && errorMessage && (
          <span className="text-xs text-danger">{errorMessage}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
