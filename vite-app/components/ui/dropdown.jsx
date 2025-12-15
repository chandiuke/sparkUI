import React, { useState, useRef, useEffect, useId, useCallback, createContext, useContext } from "react";
import { clsx } from "clsx";

// ============ Types ============
const DropdownContext = createContext(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown components must be used within a Dropdown");
  return context;
}

// ============ Icons ============
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ============ Color Classes ============
const colorClasses = {
  default: { highlight: "bg-muted", active: "bg-muted", accent: "text-foreground", border: "border-border" },
  primary: { highlight: "bg-primary/15", active: "bg-primary/20", accent: "text-primary", border: "border-primary/30" },
  secondary: { highlight: "bg-secondary/15", active: "bg-secondary/20", accent: "text-secondary", border: "border-secondary/30" },
  success: { highlight: "bg-success/15", active: "bg-success/20", accent: "text-success", border: "border-success/30" },
  warning: { highlight: "bg-warning/15", active: "bg-warning/20", accent: "text-warning", border: "border-warning/30" },
  danger: { highlight: "bg-danger/15", active: "bg-danger/20", accent: "text-danger", border: "border-danger/30" },
};

// ============ Dropdown Root ============
export function Dropdown({
  children,
  placement = "bottom-start",
  trigger = "click",
  color = "default",
  offset = 4,
  closeOnSelect = true,
  closeOnOutsideClick = true,
  disabled = false,
  defaultOpen = false,
  isOpen: controlledOpen,
  onOpenChange,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [items] = useState(() => new Map<number, boolean>());
  const [highlightPosition, setHighlightPosition] = useState(null);
  const containerRef = useRef(null);
  const triggerId = useId();
  const menuId = useId();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback((open: boolean) => {
    if (disabled && open) return;
    if (!isControlled) setInternalOpen(open);
    onOpenChange?.(open);
    if (!open) setActiveIndex(-1);
  }, [disabled, isControlled, onOpenChange]);

  const registerItem = useCallback((index: number, itemDisabled: boolean) => {
    items.set(index, itemDisabled);
  }, [items]);

  // Close on outside click
  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, closeOnOutsideClick, setIsOpen]);

  // Close on escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, setIsOpen]);

  const hoverTimeoutRef = useRef();

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      clearTimeout(hoverTimeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover") {
      hoverTimeoutRef.current = setTimeout(() => setIsOpen(false), 100);
    }
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeoutRef.current);
  }, []);

  const colorStyles = colorClasses[color];

  return (
    
      <div 
        ref={containerRef} 
        className="relative inline-flex"
        data-placement={placement}
        data-offset={offset}
        data-trigger={trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// ============ Dropdown Trigger ============
export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { isOpen, setIsOpen, triggerId, menuId } = useDropdown();
  const parentRef = useRef(null);

  const trigger = parentRef.current?.parentElement?.dataset.trigger || "click";

  const handleClick = () => {
    if (trigger === "click") setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Clone props onto child if it's a valid element (like Button)
  if (React.isValidElement(children)) {
    return (
      <div ref={parentRef} className={className}>
        {React.cloneElement(children, {
          id: triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": isOpen,
          "aria-controls": isOpen ? menuId : undefined,
          onClick: (e) => {
            handleClick();
            // Call original onClick if exists
            (children.props)?.onClick?.(e);
          },
          onKeyDown: (e) => {
            handleKeyDown(e);
            (children.props)?.onKeyDown?.(e);
          },
        })}
      </div>
    );
  }

  // Fallback: wrap plain text/nodes in a styled div
  return (
    <div
      ref={parentRef}
      id={triggerId}
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={isOpen ? menuId : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={clsx("inline-flex cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

// ============ Split Button ============
const splitButtonColors: Record> = {
  default: {
    solid: "bg-muted text-foreground hover:bg-muted/80",
    bordered: "border-2 border-border text-foreground hover:bg-muted/50",
    flat: "bg-muted/50 text-foreground hover:bg-muted",
    ghost: "text-foreground hover:bg-muted",
  },
  primary: {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    bordered: "border-2 border-primary text-primary hover:bg-primary/10",
    flat: "bg-primary/10 text-primary hover:bg-primary/20",
    ghost: "text-primary hover:bg-primary/10",
  },
  secondary: {
    solid: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    bordered: "border-2 border-secondary text-secondary hover:bg-secondary/10",
    flat: "bg-secondary/10 text-secondary hover:bg-secondary/20",
    ghost: "text-secondary hover:bg-secondary/10",
  },
  success: {
    solid: "bg-success text-success-foreground hover:bg-success/90",
    bordered: "border-2 border-success text-success hover:bg-success/10",
    flat: "bg-success/10 text-success hover:bg-success/20",
    ghost: "text-success hover:bg-success/10",
  },
  warning: {
    solid: "bg-warning text-warning-foreground hover:bg-warning/90",
    bordered: "border-2 border-warning text-warning hover:bg-warning/10",
    flat: "bg-warning/10 text-warning hover:bg-warning/20",
    ghost: "text-warning hover:bg-warning/10",
  },
  danger: {
    solid: "bg-danger text-danger-foreground hover:bg-danger/90",
    bordered: "border-2 border-danger text-danger hover:bg-danger/10",
    flat: "bg-danger/10 text-danger hover:bg-danger/20",
    ghost: "text-danger hover:bg-danger/10",
  },
};

const splitButtonSizes = {
  sm: { main: "h-8 px-3 text-sm", trigger: "h-8 w-8", icon: "w-4 h-4" },
  md: { main: "h-10 px-4 text-sm", trigger: "h-10 w-10", icon: "w-4 h-4" },
  lg: { main: "h-12 px-6 text-base", trigger: "h-12 w-12", icon: "w-5 h-5" },
};

export function DropdownSplitButton({
  children,
  color = "default",
  variant = "solid",
  size = "md",
  disabled = false,
  onClick,
  className,
}: DropdownSplitButtonProps) {
  const { isOpen, setIsOpen, triggerId, menuId } = useDropdown();
  const parentRef = useRef(null);
  const trigger = parentRef.current?.parentElement?.dataset.trigger || "click";

  const handleTriggerClick = () => {
    if (trigger === "click") setIsOpen(!isOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const colorStyle = splitButtonColors[color][variant];
  const sizeStyle = splitButtonSizes[size];
  const dividerColor = variant === "solid" ? "bg-white/20" : variant === "bordered" ? "" : "bg-current/20";

  return (
    <div ref={parentRef} className={clsx("inline-flex rounded-lg overflow-hidden", className)}>
      {/* Main button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          "inline-flex items-center justify-center font-medium cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-l-lg rounded-r-none",
          "transition-colors duration-200",
          colorStyle,
          sizeStyle.main
        )}
      >
        {children}
      </button>

      {/* Divider */}
      {variant !== "bordered" && <div className={clsx("w-px", dividerColor)} />}

      {/* Dropdown trigger */}
      <button
        type="button"
        id={triggerId}
        disabled={disabled}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-label="Open menu"
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        className={clsx(
          "inline-flex items-center justify-center cursor-pointer",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-r-lg rounded-l-none",
          "transition-colors duration-200",
          variant === "bordered" && "border-l-0",
          colorStyle,
          sizeStyle.trigger
        )}
      >
        
      </button>
    </div>
  );
}

// ============ Dropdown Menu ============
const menuVariantStyles: Record> = {
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

export function DropdownMenu({ children, variant = "default", className }: DropdownMenuProps) {
  const { isOpen, menuId, triggerId, activeIndex, setActiveIndex, items, highlightPosition, setHighlightPosition, color } = useDropdown();
  const menuRef = useRef(null);
  const parentRef = useRef(null);
  const listRef = useRef(null);

  const placement = parentRef.current?.parentElement?.dataset.placement || "bottom-start";
  const offset = Number(parentRef.current?.parentElement?.dataset.offset) || 4;

  // Only reset highlight position when menu closes (not when mouse leaves item)
  useEffect(() => {
    if (!isOpen) setHighlightPosition(null);
  }, [isOpen, setHighlightPosition]);

  const showHighlight = activeIndex !== -1 && highlightPosition !== null;

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    const enabledItems = Array.from(items.entries()).filter(([, disabled]) => !disabled).map(([idx]) => idx).sort((a, b) => a - b);
    if (enabledItems.length === 0) return;

    const currentIdx = enabledItems.indexOf(activeIndex);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIdx = currentIdx < enabledItems.length - 1 ? enabledItems[currentIdx + 1] : enabledItems[0];
        setActiveIndex(nextIdx);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIdx = currentIdx > 0 ? enabledItems[currentIdx - 1] : enabledItems[enabledItems.length - 1];
        setActiveIndex(prevIdx);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(enabledItems[0]);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(enabledItems[enabledItems.length - 1]);
        break;
    }
  }, [activeIndex, setActiveIndex, items]);

  // Placement styles
  const placementStyles = {
    "bottom": "top-full left-1/2 -translate-x-1/2",
    "bottom-start": "top-full left-0",
    "bottom-end": "top-full right-0",
    "top": "bottom-full left-1/2 -translate-x-1/2",
    "top-start": "bottom-full left-0",
    "top-end": "bottom-full right-0",
    "left": "right-full top-1/2 -translate-y-1/2",
    "left-start": "right-full top-0",
    "left-end": "right-full bottom-0",
    "right": "left-full top-1/2 -translate-y-1/2",
    "right-start": "left-full top-0",
    "right-end": "left-full bottom-0",
  };

  const animationOrigin = {
    "bottom": "origin-top",
    "bottom-start": "origin-top-left",
    "bottom-end": "origin-top-right",
    "top": "origin-bottom",
    "top-start": "origin-bottom-left",
    "top-end": "origin-bottom-right",
    "left": "origin-right",
    "left-start": "origin-top-right",
    "left-end": "origin-bottom-right",
    "right": "origin-left",
    "right-start": "origin-top-left",
    "right-end": "origin-bottom-left",
  };

  const offsetStyle = placement.startsWith("bottom") || placement.startsWith("top")
    ? { marginTop: placement.startsWith("bottom") ? offset : undefined, marginBottom: placement.startsWith("top") ? offset : undefined }
    : { marginLeft: placement.startsWith("right") ? offset : undefined, marginRight: placement.startsWith("left") ? offset : undefined };

  return (
    <div ref={parentRef}>
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={offsetStyle}
        className={clsx(
          "absolute z-50 min-w-[180px] py-1.5 rounded-xl overflow-hidden shadow-xl",
          menuVariantStyles[color][variant],
          "transition-all duration-200",
          placementStyles[placement],
          animationOrigin[placement],
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          className
        )}
      >
        {/* Items container */}
        <div ref={listRef} className="relative">
          {/* Floating highlight - stays in place, only opacity changes */}
          {highlightPosition && (
            <div
              className={clsx(
                "absolute left-1.5 right-1.5 rounded-lg pointer-events-none",
                highlightPosition.highlightClass,
                "transition-[top,height,opacity] duration-150 ease-out",
                showHighlight ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: highlightPosition.top,
                height: highlightPosition.height,
              }}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

// ============ Dropdown Item ============
let itemCounter = 0;

export function DropdownItem({
  children,
  color,
  icon,
  endContent,
  shortcut,
  description,
  disabled = false,
  danger = false,
  selected = false,
  showCheck = false,
  href,
  onClick,
  className,
}: DropdownItemProps) {
  const { setIsOpen, activeIndex, setActiveIndex, colorStyles, closeOnSelect, registerItem, setHighlightPosition } = useDropdown();
  const [index] = useState(() => itemCounter++);
  const itemRef = useRef(null);

  const isHighlighted = activeIndex === index;
  // Priority: danger > item color > dropdown color
  const itemColorStyles = danger ? colorClasses.danger : color ? colorClasses[color] : colorStyles;

  useEffect(() => {
    registerItem(index, disabled);
  }, [index, disabled, registerItem]);

  // Report position for floating highlight
  useEffect(() => {
    if (isHighlighted && itemRef.current && !disabled) {
      const rect = itemRef.current;
      setHighlightPosition({
        top: rect.offsetTop,
        height: rect.offsetHeight,
        highlightClass: itemColorStyles.highlight,
      });
      rect.scrollIntoView({ block: "nearest" });
    }
  }, [isHighlighted, disabled, setHighlightPosition, itemColorStyles.highlight]);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    if (closeOnSelect) setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const content = (
    <>
      {/* Icon */}
      {icon && <span className={clsx("shrink-0 w-5 h-5 flex items-center justify-center", (danger || color) ? itemColorStyles.accent : "text-muted-foreground")}>{icon}</span>}
      
      {/* Check for selected */}
      {showCheck && (
        <span className={clsx("shrink-0 w-4 h-4", selected ? itemColorStyles.accent : "opacity-0")}>
          
        </span>
      )}

      {/* Label & Description */}
      <div className="flex-1 min-w-0">
        <div className={clsx("truncate", selected && "font-medium")}>{children}</div>
        {description && <div className="text-xs text-muted-foreground truncate mt-0.5">{description}</div>}
      </div>

      {/* End Content / Shortcut */}
      {endContent && <span className="shrink-0 text-muted-foreground">{endContent}</span>}
      {shortcut && <kbd className="shrink-0 ml-auto text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">{shortcut}</kbd>}
    </>
  );

  const itemClasses = clsx(
    "relative flex items-center gap-2.5 mx-1.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer",
    "focus:outline-none",
    disabled && "opacity-50 cursor-not-allowed",
    selected && !disabled && itemColorStyles.active,
    (danger || color) && !disabled && itemColorStyles.accent,
    className
  );

  if (href && !disabled) {
    return (
      <a
        ref={itemRef}
        href={href}
        role="menuitem"
        tabIndex={-1}
        onClick={handleClick}
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(-1)}
        className={itemClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={itemRef}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(-1)}
      className={itemClasses}
    >
      {content}
    </div>
  );
}

// ============ Dropdown Section ============
export function DropdownSection({ children, title, showDivider = true }: DropdownSectionProps) {
  return (
    <div role="group">
      {showDivider && }
      {title && (
        <div className="px-4 py-1.5 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

// ============ Dropdown Divider ============
export function DropdownDivider({ className }: { className?: string }) {
  return <div role="separator" className={clsx("my-1 h-px bg-border mx-3", className)} />;
}

// ============ Dropdown Label ============
export function DropdownLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("px-4 py-1.5 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </div>
  );
}

// Reset counter on module load (for HMR)
if (typeof window !== "undefined") {
  itemCounter = 0;
}
