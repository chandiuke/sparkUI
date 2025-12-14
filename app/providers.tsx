"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  TransitionProvider,
  TransitionOverlay,
} from "@/components/page-transition";
import { SparkThemeProvider } from "@/components/theme-provider";
import { ThemeCustomizer } from "@/components/theme-customizer";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <SparkThemeProvider>
        <TransitionProvider>
          {children}
          <TransitionOverlay />
          <ThemeCustomizer />
        </TransitionProvider>
      </SparkThemeProvider>
    </NextThemesProvider>
  );
}
