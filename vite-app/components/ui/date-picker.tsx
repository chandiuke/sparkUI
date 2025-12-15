import React, { useState, useRef, useEffect, useId, useCallback } from "react";
import { clsx } from "clsx";

type DatePickerVariant = "default" | "filled" | "underline" | "ghost" | "flat";
type DatePickerSize = "sm" | "md" | "lg";
type DatePickerColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  color?: DatePickerColor;
  label?: string;
  placeholder?: string;
  description?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  borderless?: boolean;
  border?: string;
  focusRing?: string;
  errorMessage?: React.ReactNode;
  className?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const sizeConfig = {
  sm: { height: "h-9", text: "text-sm", label: "text-xs", px: "px-3", icon: "w-4 h-4" },
  md: { height: "h-11", text: "text-sm", label: "text-sm", px: "px-4", icon: "w-5 h-5" },
  lg: { height: "h-14", text: "text-base", label: "text-base", px: "px-4", icon: "w-5 h-5" },
};

const colorClasses = {
  default: {
    border: "border-border",
    focusBorder: "focus-within:border-foreground",
    focusRing: "focus-within:ring-[3px] focus-within:ring-foreground/25",
    label: "text-foreground",
    accent: "bg-foreground text-background",
    hover: "hover:bg-muted",
    flat: "bg-muted text-foreground",
  },
  primary: {
    border: "border-primary",
    focusBorder: "focus-within:border-primary",
    focusRing: "focus-within:ring-[3px] focus-within:ring-primary/40",
    label: "text-primary",
    accent: "bg-primary text-primary-foreground",
    hover: "hover:bg-primary/10",
    flat: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary",
    focusBorder: "focus-within:border-secondary",
    focusRing: "focus-within:ring-[3px] focus-within:ring-secondary/40",
    label: "text-secondary",
    accent: "bg-secondary text-secondary-foreground",
    hover: "hover:bg-secondary/10",
    flat: "bg-secondary/10 text-secondary",
  },
  success: {
    border: "border-success",
    focusBorder: "focus-within:border-success",
    focusRing: "focus-within:ring-[3px] focus-within:ring-success/40",
    label: "text-success",
    accent: "bg-success text-success-foreground",
    hover: "hover:bg-success/10",
    flat: "bg-success/10 text-success",
  },
  warning: {
    border: "border-warning",
    focusBorder: "focus-within:border-warning",
    focusRing: "focus-within:ring-[3px] focus-within:ring-warning/40",
    label: "text-warning",
    accent: "bg-warning text-warning-foreground",
    hover: "hover:bg-warning/10",
    flat: "bg-warning/10 text-warning",
  },
  danger: {
    border: "border-danger",
    focusBorder: "focus-within:border-danger",
    focusRing: "focus-within:ring-[3px] focus-within:ring-danger/40",
    label: "text-danger",
    accent: "bg-danger text-danger-foreground",
    hover: "hover:bg-danger/10",
    flat: "bg-danger/10 text-danger",
  },
};

export function DatePicker({
  value,
  defaultValue,
  onChange,
  variant = "default",
  size = "md",
  color = "primary",
  label,
  placeholder = "Select date",
  description,
  minDate,
  maxDate,
  disabled = false,
  required = false,
  invalid = false,
  borderless = false,
  border,
  focusRing,
  errorMessage,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue || null);
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : internalDate;

  // Determine active color: use user's color if set, otherwise default to danger for invalid state
  const hasCustomColor = color !== "primary"; // DatePicker defaults to primary
  const activeColor = hasCustomColor ? color : invalid ? "danger" : color;
  const colors = colorClasses[activeColor];
  const isDefaultColor = activeColor === "default";
  const hasCustomBorder = !!border;
  const hasCustomFocus = !!focusRing;

  useEffect(() => {
    if (selectedDate) {
      setViewDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date: Date) => {
    if (!isControlled) setInternalDate(date);
    onChange?.(date);
    setIsOpen(false);
    setViewMode("days");
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;
    return false;
  };

  const getDaysInMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  const isToday = (date: Date) => isSameDay(date, new Date());

  const navigateMonth = (delta: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1));
  };

  const navigateYear = (delta: number) => {
    setViewDate(new Date(viewDate.getFullYear() + delta, viewDate.getMonth(), 1));
  };

  // Keyboard navigation for calendar grid
  const handleCalendarKeyDown = useCallback((e: React.KeyboardEvent, currentDate: Date) => {
    let newDate: Date | null = null;
    
    switch (e.key) {
      case "ArrowLeft":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
        break;
      case "ArrowRight":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        break;
      case "ArrowUp":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
        break;
      case "ArrowDown":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!isDateDisabled(currentDate)) {
          handleSelect(currentDate);
        }
        return;
      case "Home":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        break;
      case "End":
        newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        break;
      case "PageUp":
        newDate = e.shiftKey 
          ? new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())
          : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        break;
      case "PageDown":
        newDate = e.shiftKey
          ? new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate())
          : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        break;
      default:
        return;
    }

    if (newDate && !isDateDisabled(newDate)) {
      e.preventDefault();
      setViewDate(newDate);
      // Focus the new date button after render
      setTimeout(() => {
        const btn = containerRef.current?.querySelector(`[data-date="${newDate!.toISOString().split('T')[0]}"]`) as HTMLButtonElement;
        btn?.focus();
      }, 0);
    }
  }, []);

  const selectMonth = (month: number) => {
    setViewDate(new Date(viewDate.getFullYear(), month, 1));
    setViewMode("days");
  };

  const selectYear = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setViewMode("months");
  };

  const getYearRange = () => {
    const startYear = Math.floor(viewDate.getFullYear() / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  // Variant styles (same as Input)
  const variantStyles = {
    default: clsx(
      "rounded-xl bg-background",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && colors.border,
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder.replace("focus-within:", ""),
      !hasCustomFocus && isOpen && colors.focusRing.replace("focus-within:", ""),
      !borderless && !hasCustomBorder && !isOpen && isDefaultColor && "hover:border-muted-foreground/50"
    ),
    filled: clsx(
      "rounded-xl bg-muted",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && "border-transparent",
      "hover:bg-muted/80",
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder.replace("focus-within:", ""),
      !hasCustomFocus && isOpen && colors.focusRing.replace("focus-within:", "")
    ),
    flat: clsx(
      "rounded-xl border-0",
      colors.flat,
      !hasCustomFocus && isOpen && colors.focusRing.replace("focus-within:", "")
    ),
    underline: clsx(
      "rounded-none bg-transparent",
      !borderless && "border-b-2",
      !borderless && !hasCustomBorder && colors.border,
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder.replace("focus-within:", "")
    ),
    ghost: clsx(
      "rounded-xl bg-transparent",
      !borderless && "border-2",
      !borderless && !hasCustomBorder && "border-transparent",
      "hover:bg-muted/50",
      !borderless && !hasCustomBorder && isOpen && colors.focusBorder.replace("focus-within:", ""),
      !hasCustomFocus && isOpen && colors.focusRing.replace("focus-within:", "")
    ),
  };

  const wrapperStyles = clsx(
    "relative flex items-center gap-2 transition-all duration-200 cursor-pointer",
    sizeConfig[size].height,
    sizeConfig[size].px,
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    border,
    focusRing
  );

  const CalendarIcon = () => (
    <svg className={clsx(sizeConfig[size].icon, variant === "flat" ? "text-inherit opacity-70" : "text-muted-foreground")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div ref={containerRef} className={clsx("flex flex-col gap-1.5 relative", className)}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={clsx("font-medium", sizeConfig[size].label, invalid ? "text-danger" : colors.label)}>
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}

      {/* Input trigger */}
      <button
        id={inputId}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && isOpen) {
            setIsOpen(false);
            setViewMode("days");
          }
        }}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={(description || (invalid && errorMessage)) ? `${inputId}-helper` : undefined}
        className={wrapperStyles}
      >
        <span className={clsx("flex-1 text-left", sizeConfig[size].text, selectedDate ? (variant === "flat" ? "text-inherit" : "text-foreground") : "text-muted-foreground/50")}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <CalendarIcon />
      </button>

      {/* Helper text / Error */}
      {(description || (invalid && errorMessage)) && (
        <p 
          id={`${inputId}-helper`} 
          role={invalid ? "alert" : undefined}
          aria-live={invalid ? "assertive" : undefined}
          className={clsx("text-xs", invalid ? "text-danger" : "text-muted-foreground")}
        >
          {invalid && errorMessage ? errorMessage : description}
        </p>
      )}

      {/* Calendar Dropdown */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Choose date"
        className={clsx(
          "absolute z-50 mt-1 w-72 p-4 rounded-2xl",
          "bg-card border border-border shadow-xl",
          "transition-all duration-200 origin-top",
          label ? "top-[calc(100%-4px)]" : "top-full",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        )}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
            setViewMode("days");
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => viewMode === "years" ? navigateYear(-12) : viewMode === "months" ? navigateYear(-1) : navigateMonth(-1)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "days" ? "months" : viewMode === "months" ? "years" : "years")}
            className={clsx("font-semibold px-3 py-1 rounded-lg transition-colors", colors.hover)}
          >
            {viewMode === "years"
              ? `${getYearRange()[0]} - ${getYearRange()[11]}`
              : viewMode === "months"
                ? viewDate.getFullYear()
                : `${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
          </button>
          <button
            type="button"
            onClick={() => viewMode === "years" ? navigateYear(12) : viewMode === "months" ? navigateYear(1) : navigateMonth(1)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Days View */}
        {viewMode === "days" && (
          <>
            <div className="grid grid-cols-7 gap-1 mb-2" role="row">
              {DAYS.map(day => (
                <div key={day} role="columnheader" aria-label={day === "Su" ? "Sunday" : day === "Mo" ? "Monday" : day === "Tu" ? "Tuesday" : day === "We" ? "Wednesday" : day === "Th" ? "Thursday" : day === "Fr" ? "Friday" : "Saturday"} className="text-center text-xs font-medium text-muted-foreground py-1">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendar">
              {getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()).map(({ date, isCurrentMonth }, i) => {
                const dateDisabled = isDateDisabled(date);
                const selected = selectedDate && isSameDay(date, selectedDate);
                const today = isToday(date);
                const isFocusable = isCurrentMonth && !dateDisabled && (selected || (today && !selectedDate) || (!selectedDate && !today && date.getDate() === 1));
                return (
                  <button
                    key={i}
                    type="button"
                    data-date={date.toISOString().split('T')[0]}
                    onClick={() => !dateDisabled && handleSelect(date)}
                    onKeyDown={(e) => handleCalendarKeyDown(e, date)}
                    disabled={dateDisabled}
                    aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                    aria-selected={selected || undefined}
                    aria-current={today ? "date" : undefined}
                    tabIndex={isFocusable ? 0 : -1}
                    className={clsx(
                      "w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                      !isCurrentMonth && "text-muted-foreground/40",
                      isCurrentMonth && !selected && !dateDisabled && colors.hover,
                      selected && colors.accent,
                      today && !selected && "ring-2 ring-primary/30",
                      dateDisabled && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Months View */}
        {viewMode === "months" && (
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, i) => (
              <button
                key={month}
                type="button"
                onClick={() => selectMonth(i)}
                className={clsx(
                  "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                  viewDate.getMonth() === i ? colors.accent : colors.hover
                )}
              >
                {month.slice(0, 3)}
              </button>
            ))}
          </div>
        )}

        {/* Years View */}
        {viewMode === "years" && (
          <div className="grid grid-cols-3 gap-2">
            {getYearRange().map(year => (
              <button
                key={year}
                type="button"
                onClick={() => selectYear(year)}
                className={clsx(
                  "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                  viewDate.getFullYear() === year ? colors.accent : colors.hover
                )}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {/* Today Button */}
        <button
          type="button"
          onClick={() => handleSelect(new Date())}
          className={clsx("w-full mt-4 py-2 rounded-lg text-sm font-medium transition-colors", colors.hover)}
        >
          Today
        </button>
      </div>
    </div>
  );
}
