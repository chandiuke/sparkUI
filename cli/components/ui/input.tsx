"use client";

import React, { forwardRef, useState, useId, useRef } from "react";
import { clsx } from "clsx";

type InputVariant = "default" | "filled" | "underline" | "ghost" | "flat";
type InputSize = "sm" | "md" | "lg";
type InputColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  variant?: InputVariant;
  size?: InputSize;
  color?: InputColor;
  label?: string;
  placeholder?: string;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  valid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  borderless?: boolean;
  border?: string;
  focusRing?: string;
  errorMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  className?: string;
}

const sizeConfig = {
  sm: { height: "h-9", text: "text-sm", label: "text-xs", px: "px-3", icon: "w-4 h-4" },
  md: { height: "h-11", text: "text-sm", label: "text-sm", px: "px-4", icon: "w-4 h-4" },
  lg: { height: "h-14", text: "text-base", label: "text-base", px: "px-4", icon: "w-5 h-5" },
};

const colorClasses = {
  default: {
    border: "border-border",
    focusBorder: "",
    focusRing: "focus-within:ring-[3px] focus-within:ring-foreground/25",
    label: "text-foreground",
    flat: "bg-muted text-foreground",
  },
  primary: {
    border: "border-primary",
    focusBorder: "focus-within:border-primary",
    focusRing: "focus-within:ring-[3px] focus-within:ring-primary/40",
    label: "text-primary",
    flat: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary",
    focusBorder: "focus-within:border-secondary",
    focusRing: "focus-within:ring-[3px] focus-within:ring-secondary/40",
    label: "text-secondary",
    flat: "bg-secondary/10 text-secondary",
  },
  success: {
    border: "border-success",
    focusBorder: "focus-within:border-success",
    focusRing: "focus-within:ring-[3px] focus-within:ring-success/40",
    label: "text-success",
    flat: "bg-success/10 text-success",
  },
  warning: {
    border: "border-warning",
    focusBorder: "focus-within:border-warning",
    focusRing: "focus-within:ring-[3px] focus-within:ring-warning/40",
    label: "text-warning",
    flat: "bg-warning/10 text-warning",
  },
  danger: {
    border: "border-danger",
    focusBorder: "focus-within:border-danger",
    focusRing: "focus-within:ring-[3px] focus-within:ring-danger/40",
    label: "text-danger",
    flat: "bg-danger/10 text-danger",
  },
};

// Icons
const ClearIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const Spinner = ({ className }: { className?: string }) => (
  <svg className={clsx("animate-spin", className)} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      onValueChange,
      variant = "default",
      size = "md",
      color = "default",
      label,
      placeholder,
      description,
      startContent,
      endContent,
      disabled = false,
      readOnly = false,
      required = false,
      invalid = false,
      valid = false,
      loading = false,
      clearable = false,
      borderless = false,
      border,
      focusRing,
      errorMessage,
      successMessage,
      type = "text",
      name,
      id,
      autoComplete,
      maxLength,
      onFocus,
      onBlur,
      onClear,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const inputId = id || generatedId;

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = currentValue.length > 0;
    const showClearButton = clearable && hasValue && !disabled && !readOnly && !loading;
    const isPasswordType = type === "password";
    const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

    // Determine active color: use user's color if set, otherwise default to danger/success for validation states
    const hasCustomColor = color !== "default";
    const activeColor = hasCustomColor ? color : invalid ? "danger" : valid ? "success" : color;
    const colors = colorClasses[activeColor];
    const isDefaultColor = activeColor === "default";

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(e);
      onValueChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onValueChange?.("");
      onClear?.();
      inputRef.current?.focus();
    };

    const hasCustomBorder = !!border;
    const hasCustomFocus = !!focusRing;

    const variantStyles = {
      default: clsx(
        "rounded-xl bg-background",
        !borderless && "border-2",
        !borderless && !hasCustomBorder && colors.border,
        !borderless && !hasCustomBorder && colors.focusBorder,
        !hasCustomFocus && colors.focusRing,
        !borderless && !hasCustomBorder && isDefaultColor && "hover:border-muted-foreground/50"
      ),
      filled: clsx(
        "rounded-xl bg-muted",
        !borderless && "border-2",
        !borderless && !hasCustomBorder && "border-transparent",
        "hover:bg-muted/80",
        !borderless && !hasCustomBorder && colors.focusBorder,
        !hasCustomFocus && colors.focusRing
      ),
      flat: clsx(
        "rounded-xl border-0",
        colors.flat,
        !hasCustomFocus && colors.focusRing
      ),
      underline: clsx(
        "rounded-none bg-transparent",
        !borderless && "border-b-2",
        !borderless && !hasCustomBorder && "border-border"
      ),
      ghost: clsx(
        "rounded-xl bg-transparent",
        !borderless && "border-2",
        !borderless && !hasCustomBorder && "border-transparent",
        "hover:bg-muted/50",
        !borderless && !hasCustomBorder && colors.focusBorder,
        !hasCustomFocus && colors.focusRing
      ),
    };

    const wrapperStyles = clsx(
      "relative flex items-center gap-2 transition-all duration-200",
      sizeConfig[size].height,
      sizeConfig[size].px,
      variantStyles[variant],
      (disabled || loading) && "opacity-50 cursor-not-allowed",
      border,
      focusRing
    );

    const inputStyles = clsx(
      "flex-1 bg-transparent w-full outline-none",
      "placeholder:text-muted-foreground/50",
      "disabled:cursor-not-allowed",
      sizeConfig[size].text
    );

    const IconButton = ({ onClick, ariaLabel, children }: { onClick: () => void; ariaLabel: string; children: React.ReactNode }) => (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center justify-center w-6 h-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        tabIndex={-1}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );

    // Determine helper text and icon
    const helperText = invalid && errorMessage ? errorMessage : valid && successMessage ? successMessage : description;
    const helperColor = invalid ? "text-danger" : valid ? "text-success" : "text-muted-foreground";
    const showHelper = helperText !== undefined;

    // Determine status icon to show
    const showStatusIcon = (invalid || valid) && !loading && !endContent;
    const StatusIcon = invalid ? ErrorIcon : valid ? CheckIcon : null;
    const statusIconColor = invalid ? "text-danger" : "text-success";

    return (
      <div className={clsx("flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={inputId} className={clsx("font-medium transition-colors duration-200", sizeConfig[size].label, colors.label)}>
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className={wrapperStyles}>
          {startContent && <span className="text-muted-foreground flex-shrink-0">{startContent}</span>}

          <input
            ref={(node) => {
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }}
            id={inputId}
            type={inputType}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-invalid={invalid || undefined}
            aria-describedby={showHelper ? `${inputId}-helper` : undefined}
            className={inputStyles}
          />

          {/* Max length counter */}
          {maxLength && (
            <span className={clsx("text-xs tabular-nums transition-colors", currentValue.length >= maxLength ? "text-danger" : "text-muted-foreground")}>
              {currentValue.length}/{maxLength}
            </span>
          )}

          {/* Loading spinner */}
          {loading && <Spinner className={clsx(sizeConfig[size].icon, "text-muted-foreground")} />}

          {/* Password toggle */}
          {isPasswordType && !loading && (
            <IconButton onClick={() => setShowPassword(!showPassword)} ariaLabel={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOffIcon className={sizeConfig[size].icon} /> : <EyeIcon className={sizeConfig[size].icon} />}
            </IconButton>
          )}

          {/* Clear button */}
          {showClearButton && (
            <IconButton onClick={handleClear} ariaLabel="Clear input">
              <ClearIcon className={sizeConfig[size].icon} />
            </IconButton>
          )}

          {/* Status icon (valid/invalid) */}
          {showStatusIcon && StatusIcon && (
            <span className={clsx("flex-shrink-0", statusIconColor)}>
              <StatusIcon className={sizeConfig[size].icon} />
            </span>
          )}

          {/* Custom end content */}
          {endContent && !loading && <span className="text-muted-foreground flex-shrink-0">{endContent}</span>}

          {/* Underline variant animated bar */}
          {variant === "underline" && (
            <span
              className={clsx(
                "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300",
                colors.label.replace("text-", "bg-"),
                isFocused ? "w-full" : "w-0"
              )}
            />
          )}
        </div>

        {/* Helper text / Error / Success message */}
        {showHelper && (
          <p 
            id={`${inputId}-helper`} 
            role={invalid ? "alert" : undefined}
            aria-live={invalid ? "assertive" : valid ? "polite" : undefined}
            className={clsx("text-xs transition-colors duration-200", helperColor)}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
