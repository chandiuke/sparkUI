"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { docsConfig } from "@/config/docs";

interface SidebarProps {
  className?: string;
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 20, opacity: 1 });
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPathRef = useRef(pathname);

  // Update indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = itemRefs.current.get(pathname);
      const container = containerRef.current;
      if (!activeEl || !container) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      setIndicatorStyle({
        top: activeRect.top - containerRect.top + activeRect.height / 2 - 10,
        height: 20,
        opacity: 1,
      });
    };

    // Small delay to ensure DOM is ready
    requestAnimationFrame(updateIndicator);
  }, [pathname]);

  const handleClick = (href: string) => {
    if (href === pathname || isAnimating) return;

    const clickedEl = itemRefs.current.get(href);
    const activeEl = itemRefs.current.get(pathname);
    const container = containerRef.current;

    if (!clickedEl || !activeEl || !container) {
      onLinkClick?.();
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const clickedRect = clickedEl.getBoundingClientRect();

    const activeTop = activeRect.top - containerRect.top + activeRect.height / 2 - 10;
    const clickedTop = clickedRect.top - containerRect.top + clickedRect.height / 2 - 10;

    // Calculate expanded state
    const expandedTop = Math.min(activeTop, clickedTop);
    const expandedHeight = Math.abs(clickedTop - activeTop) + 20;

    setIsAnimating(true);

    // Phase 1: Expand + slight fade
    setIndicatorStyle({
      top: expandedTop,
      height: expandedHeight,
      opacity: 0.7,
    });

    // Phase 2: Shrink to new position + fade back in
    setTimeout(() => {
      setIndicatorStyle({
        top: clickedTop,
        height: 20,
        opacity: 1,
      });
      setTimeout(() => {
        setIsAnimating(false);
      }, 200);
    }, 200);

    prevPathRef.current = href;
    onLinkClick?.();
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Animated indicator */}
      <motion.div
        className="absolute left-0 w-0.5 bg-primary rounded-full"
        animate={{
          top: indicatorStyle.top,
          height: indicatorStyle.height,
          opacity: indicatorStyle.opacity,
        }}
        transition={{ duration: 0.2, ease: "linear" }}
      />

      <nav className="space-y-6">
        {docsConfig.map((category) => (
          <div key={category.title}>
            <h4 className="font-semibold text-sm text-foreground mb-2 px-3">
              {category.title}
            </h4>
            <ul className="space-y-1">
              {category.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      ref={(el) => {
                        if (el) itemRefs.current.set(item.href, el);
                      }}
                      href={item.href}
                      onClick={() => handleClick(item.href)}
                      className={clsx(
                        "block px-3 py-1.5 text-sm transition-colors",
                        isActive
                          ? "text-primary font-medium"
                          : "text-default-500 hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={className}>
      <SidebarContent />
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center"
        aria-label="Open navigation"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-background border-r border-divider p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold text-lg">Navigation</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-default-100 transition-colors"
                  aria-label="Close navigation"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarContent onLinkClick={() => setIsOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
