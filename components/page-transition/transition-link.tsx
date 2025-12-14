"use client";

import { ReactNode, MouseEvent } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTransition } from "./transition-context";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  activeStyle?: boolean;
  onClick?: () => void;
}

export function TransitionLink({
  href,
  children,
  className,
  activeStyle = true,
  onClick,
}: TransitionLinkProps) {
  const { navigateTo, phase } = useTransition();
  const pathname = usePathname();

  const isNavigating = phase !== "idle";
  const isActive = pathname === href;
  const isDisabled = isNavigating || isActive;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isDisabled) {
      onClick?.();
      navigateTo(href);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={clsx(
        className,
        isActive &&
          activeStyle &&
          "bg-gradient-to-b from-primary from-60% to-secondary bg-clip-text text-transparent font-medium",
      )}
      style={{
        cursor: isDisabled ? "default" : "pointer",
      }}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}
