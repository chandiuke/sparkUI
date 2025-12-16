import React, { useEffect, useCallback, useRef, useId } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
type ModalPlacement = "center" | "top" | "bottom";
type ModalAnimation = "scale" | "slide-up" | "slide-down" | "fade" | "flip-x" | "flip-y" | "none";
type ScrollBehavior = "inside" | "outside";
type ModalRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type ModalShadow = "none" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
  size?: ModalSize;
  placement?: ModalPlacement;
  animation?: ModalAnimation;
  overlay?: boolean;
  overlayBlur?: boolean;
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  closeButtonPosition?: "inside" | "outside";
  className?: string;
  overlayClassName?: string;
  preventScroll?: boolean;
  isDismissable?: boolean;
  // New UX enhancements
  scrollBehavior?: ScrollBehavior;
  radius?: ModalRadius;
  shadow?: ModalShadow;
  lazyMount?: boolean;
  keepMounted?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
  motionProps?: {
    duration?: number;
    ease?: number[] | string;
  };
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}


const sizeStyles: Record<ModalSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  full: "max-w-full w-full h-screen m-0",
};

const placementStyles: Record<ModalPlacement, string> = {
  center: "items-center",
  top: "items-start pt-20",
  bottom: "items-end pb-20",
};

const radiusStyles: Record<ModalRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

const shadowStyles: Record<ModalShadow, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
};

const animations = {
  scale: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "flip-x": {
    initial: { opacity: 0, rotateX: -15, transformPerspective: 1200, y: 10 },
    animate: { opacity: 1, rotateX: 0, transformPerspective: 1200, y: 0 },
    exit: { opacity: 0, rotateX: 15, transformPerspective: 1200, y: 10 },
  },
  "flip-y": {
    initial: { opacity: 0, rotateY: -15, transformPerspective: 1200 },
    animate: { opacity: 1, rotateY: 0, transformPerspective: 1200 },
    exit: { opacity: 0, rotateY: 15, transformPerspective: 1200 },
  },
  none: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
  },
} as const;

// Spring transition for smoother feel
const springTransition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
};

const overlayTransition = {
  duration: 0.2,
  ease: "easeOut",
};

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Get scrollbar width to prevent layout shift
function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  return scrollbarWidth;
}


export function Modal({
  isOpen,
  onClose,
  onOpenChange,
  children,
  size = "md",
  placement = "center",
  animation = "scale",
  overlay = true,
  overlayBlur = true,
  overlayColor,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  closeButtonPosition = "inside",
  className,
  overlayClassName,
  preventScroll = true,
  isDismissable = true,
  scrollBehavior = "inside",
  radius = "2xl",
  shadow = "2xl",
  lazyMount = true,
  keepMounted = false,
  initialFocusRef,
  finalFocusRef,
  motionProps,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [hasBeenOpened, setHasBeenOpened] = React.useState(false);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track if modal has been opened (for lazy mount)
  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  // Notify parent of state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Store the trigger element for focus restoration
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Handle ESC key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc && isDismissable) {
        onClose();
      }
    },
    [closeOnEsc, isDismissable, onClose]
  );

  // Scroll lock with scrollbar width compensation
  useEffect(() => {
    if (isOpen && preventScroll) {
      const scrollbarWidth = getScrollbarWidth();
      const hasScrollbar = document.body.scrollHeight > window.innerHeight;
      
      document.body.style.overflow = "hidden";
      if (hasScrollbar && scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [isOpen, preventScroll]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus initial element or first focusable
      requestAnimationFrame(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          firstElement?.focus();
        }
      });
    } else {
      // Restore focus on close
      requestAnimationFrame(() => {
        if (finalFocusRef?.current) {
          finalFocusRef.current.focus();
        } else if (triggerRef.current) {
          triggerRef.current.focus();
        }
      });
    }
  }, [isOpen, initialFocusRef, finalFocusRef]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick && isDismissable) {
      onClose();
    }
  };

  const animationConfig = animations[animation];
  
  // Use spring for smoother animations, or custom motionProps
  const modalTransition = motionProps 
    ? { duration: motionProps.duration ?? 0.3, ease: motionProps.ease ?? [0.4, 0, 0.2, 1] }
    : springTransition;

  if (!mounted) return null;

  // Lazy mount: don't render until first open
  if (lazyMount && !hasBeenOpened) return null;

  // Keep mounted: render but hide when closed
  const shouldRender = keepMounted ? hasBeenOpened : isOpen;

  const isFullSize = size === "full";
  const modalRadius = isFullSize ? "none" : radius;


  const modalContent = (
    <AnimatePresence>
      {(keepMounted ? isOpen : shouldRender) && (
        <div className="fixed inset-0 z-50 flex justify-center">
          {/* Overlay */}
          {overlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={overlayTransition}
              className={clsx(
                "fixed inset-0 will-change-[opacity]",
                overlayBlur && "backdrop-blur-sm",
                overlayClassName
              )}
              style={{
                backgroundColor: overlayColor || "rgba(0, 0, 0, 0.5)",
              }}
              onClick={handleOverlayClick}
              aria-hidden="true"
            />
          )}

          {/* Modal Container */}
          <div
            className={clsx(
              "fixed inset-0 flex justify-center",
              isFullSize ? "p-0" : "p-4",
              scrollBehavior === "outside" && "overflow-y-auto",
              placementStyles[placement]
            )}
            onClick={handleOverlayClick}
          >
            {/* Close button outside */}
            {showCloseButton && closeButtonPosition === "outside" && isDismissable && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <CloseIcon className="w-6 h-6" />
              </motion.button>
            )}

            {/* Modal */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              initial={animationConfig.initial}
              animate={animationConfig.animate}
              exit={animationConfig.exit}
              transition={modalTransition}
              style={{ 
                transformOrigin: "center center",
                willChange: "transform, opacity",
              }}
              className={clsx(
                "relative w-full bg-card border border-border flex flex-col",
                radiusStyles[modalRadius],
                shadowStyles[shadow],
                scrollBehavior === "inside" && !isFullSize && "max-h-[calc(100vh-2rem)]",
                scrollBehavior === "outside" && "my-auto",
                sizeStyles[size],
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button inside */}
              {showCloseButton && closeButtonPosition === "inside" && isDismissable && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              )}
              <ModalContext.Provider value={{ titleId, descId, scrollBehavior }}>
                {children}
              </ModalContext.Provider>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

// Context for passing IDs to sub-components
const ModalContext = React.createContext<{
  titleId: string;
  descId: string;
  scrollBehavior: ScrollBehavior;
}>({
  titleId: "",
  descId: "",
  scrollBehavior: "inside",
});

export function ModalHeader({ children, className }: ModalHeaderProps) {
  const { titleId } = React.useContext(ModalContext);
  return (
    <div id={titleId} className={clsx("px-6 pt-6 pb-4 shrink-0", className)}>
      <h2 className="text-xl font-semibold text-foreground">{children}</h2>
    </div>
  );
}

export function ModalBody({ children, className }: ModalBodyProps) {
  const { descId, scrollBehavior } = React.useContext(ModalContext);
  return (
    <div
      id={descId}
      className={clsx(
        "px-6 py-2 text-muted-foreground flex-1",
        scrollBehavior === "inside" && "overflow-y-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={clsx("px-6 pt-4 pb-6 flex gap-3 justify-end shrink-0 mt-auto", className)}>
      {children}
    </div>
  );
}

// Hook for modal state management
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = React.useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle, setIsOpen };
}
