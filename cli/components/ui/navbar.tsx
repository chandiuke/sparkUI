"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  position?: "static" | "sticky";
  isBlurred?: boolean;
}

const maxWidthStyles = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function Navbar({
  children,
  className,
  maxWidth = "xl",
  position = "sticky",
  isBlurred = true,
}: NavbarProps) {
  return (
    <nav
      className={clsx(
        "w-full z-40 h-16",
        position === "sticky" && "sticky top-0",
        isBlurred && "backdrop-blur-lg backdrop-saturate-150 bg-background/70",
        !isBlurred && "bg-background",
        "border-b border-divider",
        className,
      )}
    >
      <div
        className={clsx(
          "h-full mx-auto px-6 flex items-center",
          maxWidthStyles[maxWidth],
        )}
      >
        {children}
      </div>
    </nav>
  );
}

export function NavbarBrand({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-2", className)}>{children}</div>
  );
}

export function NavbarContent({
  children,
  className,
  justify = "start",
}: {
  children: React.ReactNode;
  className?: string;
  justify?: "start" | "center" | "end";
}) {
  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end ml-auto",
  };
  return (
    <div
      className={clsx(
        "flex items-center gap-4",
        justifyStyles[justify],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function NavbarItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex items-center", className)}>{children}</div>;
}

interface NavbarMenuToggleProps {
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function NavbarMenuToggle({
  isOpen,
  onToggle,
  className,
}: NavbarMenuToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={clsx(
        "w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg",
        "hover:bg-default-100 transition-colors",
        className,
      )}
      aria-label="Toggle menu"
    >
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="w-5 h-0.5 bg-current rounded-full"
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -4 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </button>
  );
}

interface NavbarMenuProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

export function NavbarMenu({ children, isOpen, className }: NavbarMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={clsx(
            "absolute top-16 left-0 right-0 z-50",
            "bg-background/95 backdrop-blur-lg border-b border-divider",
            "overflow-hidden",
            className,
          )}
        >
          <div className="px-6 py-4 flex flex-col gap-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function NavbarMenuItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("py-2", className)}>{children}</div>;
}
