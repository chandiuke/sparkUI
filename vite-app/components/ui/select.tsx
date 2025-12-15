import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { clsx } from "clsx";

type SelectVariant = "default" | "filled" | "underline" | "ghost" | "flat";
type SelectSize = "sm" | "md" | "lg";
type SelectColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";
type MenuVariant = "default" | "solid" | "flat" | "bordered";

interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: SelectOption) => void;
  variant?: SelectVariant;
  size?: SelectSize;
  color?: SelectColor;
  menuVariant?: MenuVariant;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  borderless?: boolean;
  border?: string;
  focusRing?: string;
  errorMessage?: React.ReactNode;
  emptyMessage?: string;
  name?: string;
  id?: string;
  className?: string;
  dropdownClassName?: string;
  renderOption?: (option: SelectOption, isSelected: boolean, isHighlighted: boolean) => React.ReactNode;
  renderValue?: (option: SelectOption) => React.ReactNode;
}

const sizeConfig = {
  sm: { height: "h-9", text: "text-sm", label: "text-xs", px: "px-3", icon: "w-4 h-4", dropdown: "text-sm" },
  md: { height: "h-11", text: "text-sm", label: "text-sm", px: "px-4", icon: "w-4 h-4", dropdown: "text-sm" },
  lg: { height: "h-14", text: "text-base", label: "text-base", px: "px-4", icon: "w-5 h-5", dropdown: "text-base" },
};

const colorClasses = {
  default: {
    border: "border-border",
    focusBorder: "",
    focusRing: "ring-[3px] ring-foreground/25",
    label: "text-foreground",
    flat: "bg-muted text-foreground",
    option: "hover:bg-muted",
    selected: "bg-foreground/10 text-foreground",
    highlight: "bg-muted",
  },
  primary: {
    border: "border-primary",
    focusBorder: "border-primary",
    focusRing: "ring-[3px] ring-primary/40",
    label: "text-primary",
    flat: "bg-primary/10 text-primary",
    option: "hover:bg-primary/10",
    selected: "bg-primary/15 text-primary",
    highlight: "bg-primary/15",
  },
  secondary: {
    border: "border-secondary",
    focusBorder: "border-secondary",
    focusRing: "ring-[3px] ring-secondary/40",
    label: "text-secondary",
    flat: "bg-secondary/10 text-secondary",
    option: "hover:bg-secondary/10",
    selected: "bg-secondary/15 text-secondary",
    highlight: "bg-secondary/15",
  },
  success: {
    border: "border-success",
    focusBorder: "border-success",
    focusRing: "ring-[3px] ring-success/40",
    label: "text-success",
    flat: "bg-success/10 text-success",
    option: "hover:bg-success/10",
    selected: "bg-success/15 text-success",
    highlight: "bg-success/15",
  },
  warning: {
    border: "border-warning",
    focusBorder: "border-warning",
    focusRing: "ring-[3px] ring-warning/40",
    label: "text-warning",
    flat: "bg-warning/10 text-warning",
    option: "hover:bg-warning/10",
    selected: "bg-warning/15 text-warning",
    highlight: "bg-warning/15",
  },
  danger: {
    border: "border-danger",
    focusBorder: "border-danger",
    focusRing: "ring-[3px] ring-danger/40",
    label: "text-danger",
    flat: "bg-danger/10 text-danger",
    option: "hover:bg-danger/10",
    selected: "bg-danger/15 text-danger",
    highlight: "bg-danger/15",
  },
};

// Highlight position interface for floating highlight
interface HighlightPosition {
  top: number;
  height: number;
}

// Menu variant styles for dropdown customization
const menuVariantStyles: Record<SelectColor, Record<MenuVariant, string>> = {
  default: {
    default: "bg-card border border-border",
    solid: "bg-foreground text-background",
    flat: "bg-muted/80 border border-border",
    bordered: "bg-transparent border-2 border-border",
  },
  primary: {
    default: "bg-card border border-primary/30",
    solid: "bg-primary text-primary-foreground",
    flat: "bg-primary/10 border border-primary/20",
    bordered: "bg-transparent border-2 border-primary",
  },
  secondary: {
    default: "bg-card border border-secondary/30",
    solid: "bg-secondary text-secondary-foreground",
    flat: "bg-secondary/10 border border-secondary/20",
    bordered: "bg-transparent border-2 border-secondary",
  },
  success: {
    default: "bg-card border border-success/30",
    solid: "bg-success text-success-foreground",
    flat: "bg-success/10 border border-success/20",
    bordered: "bg-transparent border-2 border-success",
  },
  warning: {
    default: "bg-card border border-warning/30",
    solid: "bg-warning text-warning-foreground",
    flat: "bg-warning/10 border border-warning/20",
    bordered: "bg-transparent border-2 border-warning",
  },
  danger: {
    default: "bg-card border border-danger/30",
    solid: "bg-danger text-danger-foreground",
    flat: "bg-danger/10 border border-danger/20",
    bordered: "bg-transparent border-2 border-danger",
  },
};

// Icons
const ChevronIcon = ({ className, isOpen }: { className?: string; isOpen?: boolean }) => (
  <svg 
    className={clsx(className, "transition-transform duration-200", isOpen && "rotate-180")} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ClearIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Spinner = ({ className }: { className?: string }) => (
  <svg className={clsx("animate-spin", className)} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  variant = "default",
  size = "md",
  color = "primary",
  menuVariant = "default",
  label,
  placeholder = "Select an option",
  description,
  disabled = false,
  required = false,
  invalid = false,
  loading = false,
  clearable = false,
  searchable = false,
  borderless = false,
  border,
  focusRing,
  errorMessage,
  emptyMessage = "No options found",
  name,
  id,
  className,
  dropdownClassName,
  renderOption,
  renderValue,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const generatedId = useId();
  const selectId = id || generatedId;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectedOption = options.find(opt => opt.value === currentValue);

  // Determine active color
  const hasCustomColor = color !== "primary";
  const activeColor = hasCustomColor ? color : invalid ? "danger" : color;
  const colors = colorClasses[activeColor];
  const isDefaultColor = activeColor === "default";
  const hasCustomBorder = !!border;
  const hasCustomFocus = !!focusRing;

  // Filter options based on search
  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Group options
  const groupedOptions = filteredOptions.reduce((acc, opt) => {
    const group = opt.group || "";
    if (!acc[group]) acc[group] = [];
    acc[group].push(opt);
    return acc;
  }, {} as Record<string, SelectOption[]>);

  const flatFilteredOptions = filteredOptions.filter(opt => !opt.disabled);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Update highlight position and scroll into view
  useEffect(() => {
    if (highlightedIndex >= 0) {
      const optionEl = optionRefs.current.get(highlightedIndex);
      if (optionEl) {
        setHighlightPosition({
          top: optionEl.offsetTop,
          height: optionEl.offsetHeight,
        });
        optionEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Reset highlight when menu closes
  useEffect(() => {
    if (!isOpen) {
      setHighlightPosition(null);
    }
  }, [isOpen]);

  const handleSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
  }, [isControlled, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue("");
    onChange?.("", { value: "", label: "" });
  }, [isControlled, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled || loading) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0 && flatFilteredOptions[highlightedIndex]) {
          handleSelect(flatFilteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < flatFilteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : flatFilteredOptions.length - 1
          );
        }
        break;
      case "Home":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(flatFilteredOptions.length - 1);
        }
        break;
    }
  }, [disabled, loading, isOpen, highlightedIndex, flatFilteredOptions, handleSelect]);

  // Variant styles
  const variantStyles = {
    default: clsx(
      "rounded-xl bg-background",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && colors.border,
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder,
      !hasCustomFocus && isOpen && colors.focusRing,
      !borderless && !hasCustomBorder && !isOpen && isDefaultColor && "hover:border-muted-foreground/50"
    ),
    filled: clsx(
      "rounded-xl bg-muted",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && "border-transparent",
      "hover:bg-muted/80",
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder,
      !hasCustomFocus && isOpen && colors.focusRing
    ),
    flat: clsx(
      "rounded-xl border-0",
      colors.flat,
      !hasCustomFocus && isOpen && colors.focusRing
    ),
    underline: clsx(
      "rounded-none bg-transparent",
      !borderless && "border-b-2",
      !borderless && !hasCustomBorder && colors.border,
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder
    ),
    ghost: clsx(
      "rounded-xl bg-transparent",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && "border-transparent",
      "hover:bg-muted/50",
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder,
      !hasCustomFocus && isOpen && colors.focusRing
    ),
  };

  const triggerStyles = clsx(
    "relative flex items-center gap-2 transition-all duration-200 cursor-pointer w-full text-left",
    sizeConfig[size].height,
    sizeConfig[size].px,
    variantStyles[variant],
    (disabled || loading) && "opacity-50 cursor-not-allowed",
    border,
    focusRing
  );

  const showClearButton = clearable && currentValue && !disabled && !loading;
  const helperText = invalid && errorMessage ? errorMessage : description;
  const showHelper = helperText !== undefined;

  return (
    <div ref={containerRef} className={clsx("flex flex-col gap-1.5 relative", className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={selectId} 
          className={clsx("font-medium transition-colors duration-200", sizeConfig[size].label, invalid ? "text-danger" : colors.label)}
        >
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Hidden native select for form submission */}
      {name && (
        <select name={name} value={currentValue} onChange={() => {}} className="sr-only" tabIndex={-1}>
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      )}

      {/* Trigger Button */}
      <button
        id={selectId}
        type="button"
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-describedby={showHelper ? `${selectId}-helper` : undefined}
        aria-invalid={invalid || undefined}
        className={triggerStyles}
      >
        {/* Selected Value or Placeholder */}
        <span className={clsx("flex-1 truncate", sizeConfig[size].text, selectedOption ? (variant === "flat" ? "text-inherit" : "text-foreground") : "text-muted-foreground/50")}>
          {selectedOption ? (
            renderValue ? renderValue(selectedOption) : (
              <span className="flex items-center gap-2">
                {selectedOption.icon}
                {selectedOption.label}
              </span>
            )
          ) : placeholder}
        </span>

        {/* Loading Spinner */}
        {loading && <Spinner className={clsx(sizeConfig[size].icon, variant === "flat" ? "text-inherit opacity-70" : "text-muted-foreground")} />}

        {/* Clear Button */}
        {showClearButton && !loading && (
          <span
            role="button"
            onClick={handleClear}
            className={clsx("flex items-center justify-center w-5 h-5 rounded-full transition-colors cursor-pointer", variant === "flat" ? "text-inherit opacity-70 hover:opacity-100" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}
            tabIndex={-1}
            aria-label="Clear selection"
          >
            <ClearIcon className="w-3.5 h-3.5" />
          </span>
        )}

        {/* Chevron */}
        {!loading && (
          <ChevronIcon className={clsx(sizeConfig[size].icon, "shrink-0", variant === "flat" ? "text-inherit opacity-70" : "text-muted-foreground")} isOpen={isOpen} />
        )}
      </button>

      {/* Helper text / Error */}
      {showHelper && (
        <p 
          id={`${selectId}-helper`}
          role={invalid ? "alert" : undefined}
          aria-live={invalid ? "assertive" : undefined}
          className={clsx("text-xs transition-colors duration-200", invalid ? "text-danger" : "text-muted-foreground")}
        >
          {helperText}
        </p>
      )}

      {/* Dropdown */}
      <div
        role="listbox"
        aria-labelledby={selectId}

        className={clsx(
          "absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-xl",
          menuVariantStyles[activeColor][menuVariant],
          "transition-all duration-200 origin-top",
          label ? "top-[calc(100%-4px)]" : "top-full",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
          dropdownClassName
        )}
      >
        {/* Search Input */}
        {searchable && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className={clsx(
                  "w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border-0 outline-none",
                  "placeholder:text-muted-foreground/50",
                  "focus:ring-2 focus:ring-primary/30",
                  sizeConfig[size].dropdown
                )}
              />
            </div>
          </div>
        )}

        {/* Options List */}
        <div ref={listRef} className="relative max-h-64 overflow-y-auto p-1.5">
          {/* Floating highlight */}
          {highlightPosition && (
            <div
              className={clsx(
                "absolute left-1.5 right-1.5 rounded-lg pointer-events-none",
                colors.highlight,
                "transition-[top,height,opacity] duration-150 ease-out",
                highlightedIndex !== -1 ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: highlightPosition.top,
                height: highlightPosition.height,
              }}
            />
          )}
          
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-center text-muted-foreground text-sm">
              {emptyMessage}
            </div>
          ) : (
            Object.entries(groupedOptions).map(([group, groupOptions]) => (
              <div key={group || "ungrouped"}>
                {/* Group Label */}
                {group && (
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {group}
                  </div>
                )}
                
                {/* Options */}
                {groupOptions.map((option) => {
                  const globalIndex = flatFilteredOptions.findIndex(o => o.value === option.value);
                  const isSelected = option.value === currentValue;
                  const isHighlighted = globalIndex === highlightedIndex;

                  if (renderOption) {
                    return (
                      <div
                        key={option.value}
                        data-index={globalIndex}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => !option.disabled && setHighlightedIndex(globalIndex)}
                        className={clsx(option.disabled && "opacity-50 cursor-not-allowed")}
                      >
                        {renderOption(option, isSelected, isHighlighted)}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={option.value}
                      ref={(el) => { if (el) optionRefs.current.set(globalIndex, el); }}
                      type="button"
                      data-index={globalIndex}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => !option.disabled && setHighlightedIndex(globalIndex)}
                      disabled={option.disabled}
                      role="option"
                      aria-selected={isSelected}
                      className={clsx(
                        "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150",
                        "focus:outline-none",
                        sizeConfig[size].dropdown,
                        option.disabled && "opacity-50 cursor-not-allowed",
                        isSelected && "font-medium"
                      )}
                    >
                      {/* Icon */}
                      {option.icon && (
                        <span className="shrink-0 text-muted-foreground">
                          {option.icon}
                        </span>
                      )}

                      {/* Label & Description */}
                      <div className="flex-1 min-w-0">
                        <div className="truncate">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground truncate mt-0.5">
                            {option.description}
                          </div>
                        )}
                      </div>

                      {/* Check Icon */}
                      {isSelected && (
                        <CheckIcon className={clsx("w-4 h-4 shrink-0", `text-${activeColor === "default" ? "foreground" : activeColor}`)} />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


// ============ Multi Select ============
interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], options: SelectOption[]) => void;
  variant?: SelectVariant;
  size?: SelectSize;
  color?: SelectColor;
  menuVariant?: MenuVariant;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  loading?: boolean;
  searchable?: boolean;
  borderless?: boolean;
  border?: string;
  focusRing?: string;
  errorMessage?: React.ReactNode;
  emptyMessage?: string;
  maxDisplay?: number;
  name?: string;
  id?: string;
  className?: string;
  dropdownClassName?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onChange,
  variant = "default",
  size = "md",
  color = "primary",
  menuVariant = "default",
  label,
  placeholder = "Select options",
  description,
  disabled = false,
  required = false,
  invalid = false,
  loading = false,
  searchable = false,
  borderless = false,
  border,
  focusRing,
  errorMessage,
  emptyMessage = "No options found",
  maxDisplay = 3,
  name,
  id,
  className,
  dropdownClassName,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightPosition, setHighlightPosition] = useState<HighlightPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  const generatedId = useId();
  const selectId = id || generatedId;

  const isControlled = value !== undefined;
  const currentValues = isControlled ? value : internalValue;
  const selectedOptions = options.filter(opt => currentValues.includes(opt.value));

  // Determine active color
  const hasCustomColor = color !== "primary";
  const activeColor = hasCustomColor ? color : invalid ? "danger" : color;
  const colors = colorClasses[activeColor];
  const isDefaultColor = activeColor === "default";
  const hasCustomBorder = !!border;
  const hasCustomFocus = !!focusRing;

  // Filter options
  const filteredOptions = searchable && searchQuery
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const flatFilteredOptions = filteredOptions.filter(opt => !opt.disabled);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Update highlight position and scroll into view
  useEffect(() => {
    if (highlightedIndex >= 0) {
      const optionEl = optionRefs.current.get(highlightedIndex);
      if (optionEl) {
        setHighlightPosition({
          top: optionEl.offsetTop,
          height: optionEl.offsetHeight,
        });
        optionEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  // Reset highlight when menu closes
  useEffect(() => {
    if (!isOpen) {
      setHighlightPosition(null);
    }
  }, [isOpen]);

  const toggleOption = useCallback((option: SelectOption) => {
    if (option.disabled) return;
    
    const newValues = currentValues.includes(option.value)
      ? currentValues.filter(v => v !== option.value)
      : [...currentValues, option.value];
    
    if (!isControlled) setInternalValue(newValues);
    onChange?.(newValues, options.filter(opt => newValues.includes(opt.value)));
  }, [currentValues, isControlled, onChange, options]);

  const removeOption = useCallback((e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    const newValues = currentValues.filter(v => v !== optionValue);
    if (!isControlled) setInternalValue(newValues);
    onChange?.(newValues, options.filter(opt => newValues.includes(opt.value)));
  }, [currentValues, isControlled, onChange, options]);

  const clearAll = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue([]);
    onChange?.([], []);
  }, [isControlled, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled || loading) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (highlightedIndex >= 0 && flatFilteredOptions[highlightedIndex]) {
          toggleOption(flatFilteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => prev < flatFilteredOptions.length - 1 ? prev + 1 : 0);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => prev > 0 ? prev - 1 : flatFilteredOptions.length - 1);
        }
        break;
      case "Backspace":
        if (!searchQuery && currentValues.length > 0) {
          const newValues = currentValues.slice(0, -1);
          if (!isControlled) setInternalValue(newValues);
          onChange?.(newValues, options.filter(opt => newValues.includes(opt.value)));
        }
        break;
    }
  }, [disabled, loading, isOpen, highlightedIndex, flatFilteredOptions, toggleOption, searchQuery, currentValues, isControlled, onChange, options]);

  // Variant styles
  const variantStyles = {
    default: clsx(
      "rounded-xl bg-background",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && colors.border,
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder,
      !hasCustomFocus && isOpen && colors.focusRing,
      !borderless && !hasCustomBorder && !isOpen && isDefaultColor && "hover:border-muted-foreground/50"
    ),
    filled: clsx("rounded-xl bg-muted", !borderless && "border-2", !borderless && !hasCustomBorder && "border-transparent", "hover:bg-muted/80", !borderless && !hasCustomBorder && isOpen && colors.focusBorder, !hasCustomFocus && isOpen && colors.focusRing),
    flat: clsx("rounded-xl border-0", colors.flat, !hasCustomFocus && isOpen && colors.focusRing),
    underline: clsx("rounded-none bg-transparent", !borderless && "border-b-2", !borderless && !hasCustomBorder && colors.border, !borderless && !hasCustomBorder && isOpen && colors.focusBorder),
    ghost: clsx("rounded-xl bg-transparent", !borderless && "border-2", !borderless && !hasCustomBorder && "border-transparent", "hover:bg-muted/50", !borderless && !hasCustomBorder && isOpen && colors.focusBorder, !hasCustomFocus && isOpen && colors.focusRing),
  };

  const triggerStyles = clsx(
    "relative flex items-center gap-2 transition-all duration-200 cursor-pointer w-full text-left min-h-[2.75rem]",
    sizeConfig[size].px,
    "py-1.5",
    variantStyles[variant],
    (disabled || loading) && "opacity-50 cursor-not-allowed",
    border,
    focusRing
  );

  const helperText = invalid && errorMessage ? errorMessage : description;
  const showHelper = helperText !== undefined;
  const displayedOptions = selectedOptions.slice(0, maxDisplay);
  const remainingCount = selectedOptions.length - maxDisplay;

  return (
    <div ref={containerRef} className={clsx("flex flex-col gap-1.5 relative", className)}>
      {label && (
        <label htmlFor={selectId} className={clsx("font-medium transition-colors duration-200", sizeConfig[size].label, invalid ? "text-danger" : colors.label)}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {name && currentValues.map(v => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <button
        id={selectId}
        type="button"
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={invalid || undefined}
        aria-describedby={showHelper ? `${selectId}-helper` : undefined}
        className={triggerStyles}
      >
        <div className="flex-1 flex flex-wrap gap-1.5 items-center min-w-0">
          {selectedOptions.length === 0 ? (
            <span className={clsx(sizeConfig[size].text, "text-muted-foreground/50")}>{placeholder}</span>
          ) : (
            <>
              {displayedOptions.map(opt => (
                <span
                  key={opt.value}
                  className={clsx(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium",
                    colors.selected
                  )}
                >
                  {opt.icon}
                  <span className="truncate max-w-[100px]">{opt.label}</span>
                  <span
                    role="button"
                    onClick={(e) => removeOption(e, opt.value)}
                    className="ml-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded p-0.5 transition-colors cursor-pointer"
                    tabIndex={-1}
                  >
                    <ClearIcon className="w-3 h-3" />
                  </span>
                </span>
              ))}
              {remainingCount > 0 && (
                <span className={clsx("px-2 py-0.5 rounded-md text-xs font-medium", colors.selected)}>
                  +{remainingCount} more
                </span>
              )}
            </>
          )}
        </div>

        {loading && <Spinner className={clsx(sizeConfig[size].icon, variant === "flat" ? "text-inherit opacity-70" : "text-muted-foreground")} />}

        {currentValues.length > 0 && !loading && (
          <span
            role="button"
            onClick={clearAll}
            className={clsx("flex items-center justify-center w-5 h-5 rounded-full transition-colors cursor-pointer", variant === "flat" ? "text-inherit opacity-70 hover:opacity-100" : "text-muted-foreground hover:text-foreground hover:bg-muted/50")}
            tabIndex={-1}
            aria-label="Clear all"
          >
            <ClearIcon className="w-3.5 h-3.5" />
          </span>
        )}

        {!loading && <ChevronIcon className={clsx(sizeConfig[size].icon, "shrink-0", variant === "flat" ? "text-inherit opacity-70" : "text-muted-foreground")} isOpen={isOpen} />}
      </button>

      {showHelper && (
        <p id={`${selectId}-helper`} role={invalid ? "alert" : undefined} aria-live={invalid ? "assertive" : undefined} className={clsx("text-xs transition-colors duration-200", invalid ? "text-danger" : "text-muted-foreground")}>
          {helperText}
        </p>
      )}

      <div
        role="listbox"
        aria-multiselectable="true"
        style={menuVariant === "flat" ? { backdropFilter: "blur(12px) saturate(1.5)", WebkitBackdropFilter: "blur(12px) saturate(1.5)" } : undefined}
        className={clsx(
          "absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-xl",
          menuVariantStyles[activeColor][menuVariant],
          "transition-all duration-200 origin-top",
          label ? "top-[calc(100%-4px)]" : "top-full",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
          dropdownClassName
        )}
      >
        {searchable && (
          <div className="p-2 border-b border-border">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setHighlightedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className={clsx("w-full pl-9 pr-3 py-2 rounded-lg bg-muted/50 border-0 outline-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/30", sizeConfig[size].dropdown)}
              />
            </div>
          </div>
        )}

        <div ref={listRef} className="relative max-h-64 overflow-y-auto p-1.5">
          {/* Floating highlight */}
          {highlightPosition && (
            <div
              className={clsx(
                "absolute left-1.5 right-1.5 rounded-lg pointer-events-none",
                colors.highlight,
                "transition-[top,height,opacity] duration-150 ease-out",
                highlightedIndex !== -1 ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: highlightPosition.top,
                height: highlightPosition.height,
              }}
            />
          )}
          
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-6 text-center text-muted-foreground text-sm">{emptyMessage}</div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = currentValues.includes(option.value);

              return (
                <button
                  key={option.value}
                  ref={(el) => { if (el) optionRefs.current.set(index, el); }}
                  type="button"
                  data-index={index}
                  onClick={() => toggleOption(option)}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                  disabled={option.disabled}
                  role="option"
                  aria-selected={isSelected}
                  className={clsx(
                    "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors duration-150 focus:outline-none",
                    sizeConfig[size].dropdown,
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {/* Checkbox */}
                  <span className={clsx(
                    "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
                    isSelected ? `bg-${activeColor === "default" ? "foreground" : activeColor} border-${activeColor === "default" ? "foreground" : activeColor}` : "border-muted-foreground/50"
                  )}>
                    {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                  </span>

                  {option.icon && <span className="shrink-0 text-muted-foreground">{option.icon}</span>}

                  <div className="flex-1 min-w-0">
                    <div className={clsx("truncate", isSelected && "font-medium")}>{option.label}</div>
                    {option.description && <div className="text-xs text-muted-foreground truncate mt-0.5">{option.description}</div>}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
