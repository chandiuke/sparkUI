"use client";

import React, { forwardRef, useState, useId, useRef, useEffect } from "react";
import { clsx } from "clsx";

type TextareaVariant = "default" | "filled" | "underline" | "ghost" | "flat";
type TextareaSize = "sm" | "md" | "lg";
type TextareaColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type TextareaResize = "none" | "vertical" | "horizontal" | "both" | "auto";

interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onValueChange?: (value: string) => void;
  variant?: TextareaVariant;
  size?: TextareaSize;
  color?: TextareaColor;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  valid?: boolean;
  loading?: boolean;
  borderless?: boolean;
  border?: string;
  focusRing?: string;
  errorMessage?: React.ReactNode;
  successMessage?: React.ReactNode;
  name?: string;
  id?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: TextareaResize;
  maxLength?: number;
  showCount?: boolean;
  autoComplete?: string;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const sizeConfig = {
  sm: { text: "text-sm", label: "text-xs", px: "px-3", py: "py-2" },
  md: { text: "text-sm", label: "text-sm", px: "px-4", py: "py-3" },
  lg: { text: "text-base", label: "text-base", px: "px-4", py: "py-4" },
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




export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      disabled = false,
      readOnly = false,
      required = false,
      invalid = false,
      valid = false,
      loading = false,
      borderless = false,
      border,
      focusRing,
      errorMessage,
      successMessage,
      name,
      id,
      rows = 3,
      minRows,
      maxRows,
      resize = "vertical",
      maxLength,
      showCount = false,
      autoComplete,
      onFocus,
      onBlur,
      className,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const generatedId = useId();
    const textareaId = id || generatedId;

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Determine active color: use user's color if set, otherwise default to danger/success for validation states
    const hasCustomColor = color !== "default";
    const activeColor = hasCustomColor ? color : invalid ? "danger" : valid ? "success" : color;
    const colors = colorClasses[activeColor];
    const isDefaultColor = activeColor === "default";

    // Auto-resize logic
    const isAutoResize = resize === "auto";
    const effectiveMinRows = minRows || rows;
    const effectiveMaxRows = maxRows;

    // Auto-resize effect
    useEffect(() => {
      const textarea = textareaRef.current;
      if (!isAutoResize || !textarea) return;

      const adjustHeight = () => {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = "auto";
        
        const computed = getComputedStyle(textarea);
        const lineHeight = parseFloat(computed.lineHeight) || 20;
        const paddingTop = parseFloat(computed.paddingTop) || 0;
        const paddingBottom = parseFloat(computed.paddingBottom) || 0;
        const borderTop = parseFloat(computed.borderTopWidth) || 0;
        const borderBottom = parseFloat(computed.borderBottomWidth) || 0;
        
        const padding = paddingTop + paddingBottom + borderTop + borderBottom;
        const minHeight = lineHeight * effectiveMinRows + padding;
        const maxHeight = effectiveMaxRows ? lineHeight * effectiveMaxRows + padding : Infinity;
        
        // Use scrollHeight for actual content height
        const scrollHeight = textarea.scrollHeight;
        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        
        textarea.style.height = `${newHeight}px`;
        
        // Add scrollbar if content exceeds maxHeight
        textarea.style.overflowY = scrollHeight > maxHeight ? "auto" : "hidden";
      };

      adjustHeight();
    }, [currentValue, isAutoResize, effectiveMinRows, effectiveMaxRows]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(e);
      onValueChange?.(newValue);
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

    // For horizontal/both resize, we apply styles directly to textarea (no wrapper styling)
    const allowsHorizontalResize = resize === "horizontal" || resize === "both";

    // When horizontal resize is enabled, styles go on textarea, not wrapper
    const wrapperStyles = allowsHorizontalResize
      ? clsx("flex flex-col gap-1.5", className)
      : clsx(
          "relative transition-all duration-200 w-full",
          variantStyles[variant],
          (disabled || loading) && "opacity-50 cursor-not-allowed",
          border,
          focusRing
        );

    const textareaStyles = clsx(
      "outline-none block",
      "placeholder:text-muted-foreground/50",
      "disabled:cursor-not-allowed",
      sizeConfig[size].text,
      sizeConfig[size].px,
      sizeConfig[size].py,
      // For horizontal resize, apply all styling to textarea itself (no transition!)
      allowsHorizontalResize && variantStyles[variant],
      allowsHorizontalResize && (disabled || loading) && "opacity-50 cursor-not-allowed",
      allowsHorizontalResize && border,
      allowsHorizontalResize && focusRing,
      // Width handling
      !allowsHorizontalResize && "w-full bg-transparent",
      allowsHorizontalResize && "bg-background",
      // Apply resize styles
      resize === "none" && "resize-none",
      resize === "vertical" && "resize-y min-h-[60px]",
      resize === "horizontal" && "resize-x min-w-[200px]",
      resize === "both" && "resize min-h-[60px] min-w-[200px]",
      resize === "auto" && "resize-none overflow-hidden"
    );

    // Determine helper text and icon
    const helperText = invalid && errorMessage ? errorMessage : valid && successMessage ? successMessage : description;
    const helperColor = invalid ? "text-danger" : valid ? "text-success" : "text-muted-foreground";
    const showHelper = helperText !== undefined;
    const showCharCount = showCount || maxLength;

    // Status icon
    const StatusIcon = invalid ? ErrorIcon : valid ? CheckIcon : null;
    const statusIconColor = invalid ? "text-danger" : "text-success";

    const textareaElement = (
      <textarea
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }}
        id={textareaId}
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
        rows={isAutoResize ? effectiveMinRows : rows}
        aria-invalid={invalid || undefined}
        aria-describedby={showHelper ? `${textareaId}-helper` : undefined}
        className={textareaStyles}
      />
    );

    return (
      <div className={clsx("flex flex-col gap-1.5", className)}>
        {/* Label row */}
        {(label || (invalid || valid) || loading) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={textareaId} className={clsx("font-medium transition-colors duration-200", sizeConfig[size].label, colors.label)}>
                {label}
                {required && <span className="text-danger ml-1">*</span>}
              </label>
            )}
            <div className="flex items-center gap-2">
              {loading && <Spinner className="w-4 h-4 text-muted-foreground" />}
              {!loading && StatusIcon && (
                <span className={statusIconColor}>
                  <StatusIcon className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        )}

        {/* For horizontal resize, render textarea directly without wrapper */}
        {allowsHorizontalResize ? (
          textareaElement
        ) : (
          <div className={wrapperStyles}>
            {textareaElement}

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
        )}

        {/* Footer row: helper text + character count */}
        {(showHelper || showCharCount) && (
          <div className="flex items-center justify-between gap-4">
            {showHelper ? (
              <p 
                id={`${textareaId}-helper`} 
                role={invalid ? "alert" : undefined}
                aria-live={invalid ? "assertive" : valid ? "polite" : undefined}
                className={clsx("text-xs transition-colors duration-200 flex-1", helperColor)}
              >
                {helperText}
              </p>
            ) : <span />}
            {showCharCount && (
              <span className={clsx("text-xs tabular-nums transition-colors flex-shrink-0", 
                maxLength && currentValue.length >= maxLength ? "text-danger" : "text-muted-foreground"
              )}>
                {currentValue.length}{maxLength ? `/${maxLength}` : ""}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
