"use client";

import { createContext, useContext, useState, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

type AccordionVariant = "default" | "bordered" | "splitted" | "shadow";

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  variant: AccordionVariant;
  hideIndicator: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
}

// ============ Accordion Root ============
interface AccordionProps {
  children: React.ReactNode;
  type?: "single" | "multiple";
  defaultExpanded?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  variant?: AccordionVariant;
  hideIndicator?: boolean;
  className?: string;
}

export function Accordion({
  children,
  type = "single",
  defaultExpanded = [],
  value,
  onValueChange,
  variant = "default",
  hideIndicator = false,
  className,
}: AccordionProps) {
  const isControlled = value !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);
  
  const expandedItems = isControlled ? value : internalExpanded;

  useEffect(() => {
    if (!isControlled && defaultExpanded.length > 0) {
      setInternalExpanded(defaultExpanded);
    }
  }, []);

  const toggleItem = (id: string) => {
    let newValue: string[];
    
    if (type === "single") {
      newValue = expandedItems.includes(id) ? [] : [id];
    } else {
      newValue = expandedItems.includes(id)
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id];
    }

    if (!isControlled) {
      setInternalExpanded(newValue);
    }
    
    onValueChange?.(newValue);
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, variant, hideIndicator }}>
      <div
        className={clsx(
          variant === "splitted" && "space-y-3",
          variant === "shadow" && "space-y-3",
          variant === "bordered" && "border border-border/80 dark:border-border rounded-xl overflow-hidden divide-y divide-border/80 dark:divide-border bg-card",
          variant === "default" && "divide-y divide-border/80 dark:divide-border",
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}


// ============ Accordion Item ============
interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
}

export function AccordionItem({
  children,
  value,
  disabled = false,
  className,
}: AccordionItemProps) {
  const { variant, expandedItems } = useAccordion();
  const itemId = useId();
  const isExpanded = expandedItems.includes(value);
  const contextValue = { itemId, value, disabled };

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isExpanded && (variant === "splitted" || variant === "shadow") 
            ? "hsl(var(--primary) / 0.05)" 
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
        className={clsx(
          "relative",
          variant === "splitted" && "border border-border rounded-xl overflow-hidden bg-card",
          variant === "shadow" && "rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-card border border-border/50",
          disabled && "opacity-50",
          className
        )}
        data-disabled={disabled || undefined}
        data-expanded={isExpanded || undefined}
      >
        {children}
      </motion.div>
    </AccordionItemContext.Provider>
  );
}

interface AccordionItemContextValue {
  itemId: string;
  value: string;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionTrigger/Content must be used within AccordionItem");
  }
  return context;
}

// ============ Accordion Trigger ============
interface AccordionTriggerProps {
  children: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  indicator?: React.ReactNode;
}

export function AccordionTrigger({ children, subtitle, className, indicator }: AccordionTriggerProps) {
  const { expandedItems, toggleItem, variant, hideIndicator } = useAccordion();
  const { itemId, value, disabled } = useAccordionItem();
  const isExpanded = expandedItems.includes(value);

  return (
    <button
      type="button"
      id={`accordion-trigger-${itemId}`}
      aria-expanded={isExpanded}
      aria-controls={`accordion-content-${itemId}`}
      disabled={disabled}
      onClick={() => !disabled && toggleItem(value)}
      className={clsx(
        "group flex w-full items-center justify-between py-4 text-left font-medium transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variant === "splitted" || variant === "bordered" || variant === "shadow" ? "px-5" : "px-0",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        !disabled && "hover:text-primary",
        className
      )}
    >
      <div className="flex-1 pr-4">
        <span>{children}</span>
        {subtitle && (
          <p className="text-sm font-normal text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {!hideIndicator && (indicator || (
        <motion.div
          animate={{ 
            rotate: isExpanded ? 180 : 0,
            scale: isExpanded ? 1.1 : 1,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
          className={clsx(
            "shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
            isExpanded 
              ? "bg-primary text-primary-foreground shadow-sm" 
              : "bg-muted/80 text-muted-foreground group-hover:bg-primary/15 group-hover:text-primary dark:bg-muted"
          )}
        >
          <ChevronIcon className="w-4 h-4" />
        </motion.div>
      ))}
    </button>
  );
}


// ============ Accordion Content ============
interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { expandedItems, variant } = useAccordion();
  const { itemId, value } = useAccordionItem();
  const isExpanded = expandedItems.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          id={`accordion-content-${itemId}`}
          role="region"
          aria-labelledby={`accordion-trigger-${itemId}`}
          aria-hidden={!isExpanded}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: "auto", 
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.25, delay: 0.05 }
            }
          }}
          exit={{ 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.15 }
            }
          }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            exit={{ y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "pb-5 text-muted-foreground leading-relaxed",
              variant === "splitted" || variant === "bordered" || variant === "shadow" ? "px-5" : "px-0",
              className
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ Plus/Minus Icon (Alternative) ============
export function AccordionPlusIcon({ className }: { className?: string }) {
  const { expandedItems } = useAccordion();
  const { value } = useAccordionItem();
  const isExpanded = expandedItems.includes(value);

  return (
    <div className={clsx("relative w-5 h-5", className)}>
      <motion.span
        className="absolute top-1/2 left-0 w-full h-0.5 bg-current rounded-full"
        style={{ y: "-50%" }}
      />
      <motion.span
        animate={{ rotate: isExpanded ? 90 : 0, opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-1/2 w-0.5 h-full bg-current rounded-full"
        style={{ x: "-50%" }}
      />
    </div>
  );
}

// ============ Chevron Icon ============
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ============ Hook for external use ============
export function useAccordionState() {
  return useAccordion();
}
