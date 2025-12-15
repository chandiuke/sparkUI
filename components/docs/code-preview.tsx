"use client";

import React, { useState, ReactNode } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { motion, AnimatePresence } from "framer-motion"; // Keep for CopyButton animation
import { Copy, Check, Eye, Code2 } from "lucide-react";
import { clsx } from "clsx";

interface CodePreviewProps {
  preview: ReactNode;
  code: string;
  jsxCode?: string;
  className?: string;
}

interface CodeBlockProps {
  code: string;
  jsxCode?: string;
  language?: string;
  className?: string;
  showCopy?: boolean;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all overflow-hidden"
      aria-label="Copy code"
      suppressHydrationWarning
    >
      <div className="relative w-4 h-4">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 text-green-400"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0"
            >
              <Copy className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

function LanguageToggle({
  language,
  onToggle,
}: {
  language: "tsx" | "jsx";
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs font-mono text-gray-400 hover:text-gray-200 transition-all"
      suppressHydrationWarning
    >
      <span className={language === "tsx" ? "text-blue-400" : "text-gray-500"}>
        TS
      </span>
      <span className="text-gray-600">/</span>
      <span className={language === "jsx" ? "text-yellow-400" : "text-gray-500"}>
        JS
      </span>
    </button>
  );
}

function CodeRenderer({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={language}>
      {({
        className: preClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          className={clsx(
            preClassName,
            "p-4 overflow-x-auto text-sm leading-relaxed"
          )}
          style={{ ...style, background: "rgb(17, 17, 17)" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

// Auto-convert TSX to JSX by removing type annotations
function convertToJsx(tsxCode: string): string {
  return tsxCode
    // Remove type imports
    .replace(/import\s+type\s+.*?from\s+['"].*?['"];?\n?/g, "")
    // Remove type-only imports from combined imports
    .replace(/,?\s*type\s+\w+/g, "")
    // Remove interface definitions
    .replace(/interface\s+\w+\s*\{[\s\S]*?\}\n*/g, "")
    // Remove type definitions  
    .replace(/type\s+\w+\s*=[\s\S]*?;\n*/g, "")
    // Remove generic type params from hooks: useState<string[]>([]) -> useState([])
    .replace(/(useState|useRef|useCallback|useMemo|useContext)<[^>]+>/g, "$1")
    // Remove type assertions: as Type or as Type[]
    .replace(/\s+as\s+\w+(\[\])?/g, "")
    // Remove function return type annotations: ): ReactNode => or ): void {
    .replace(/\):\s*[A-Za-z\[\]<>,\s\|\.]+\s*(?==>|\{)/g, ") ")
    // Remove variable type annotations: const x: Type = or let x: Type =
    .replace(/(const|let|var)\s+(\w+):\s*[A-Za-z\[\]<>,\s\|\.]+\s*=/g, "$1 $2 =")
    // Remove param type annotations in arrow functions: (x: Type) => or (x: Type, y: Type) =>
    .replace(/\(([^)]*)\)\s*=>/g, (match, params) => {
      const cleanParams = params.replace(/:\s*[A-Za-z\[\]<>,\s\|\.]+/g, "");
      return `(${cleanParams}) =>`;
    })
    // Clean up empty imports
    .replace(/import\s*\{\s*\}\s*from\s*['"].*?['"];?\n?/g, "")
    // Clean up extra commas
    .replace(/\{\s*,/g, "{")
    .replace(/,\s*\}/g, "}")
    // Clean up extra blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function CodeBlock({
  code,
  jsxCode,
  language = "tsx",
  className,
  showCopy = true,
}: CodeBlockProps) {
  const [currentLang, setCurrentLang] = useState<"tsx" | "jsx">("tsx");
  const hasJsx = jsxCode !== undefined || language === "tsx";

  const displayCode = currentLang === "jsx" ? (jsxCode || convertToJsx(code)) : code;

  return (
    <div className={clsx("relative group rounded-xl overflow-hidden", className)}>
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {hasJsx && (
          <LanguageToggle
            language={currentLang}
            onToggle={() => setCurrentLang(currentLang === "tsx" ? "jsx" : "tsx")}
          />
        )}
        {showCopy && <CopyButton code={displayCode} />}
      </div>
      <CodeRenderer code={displayCode} language={currentLang === "jsx" ? "jsx" : language} />
    </div>
  );
}

// Animated tabs with horizontal shrinking indicator
function AnimatedTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 4, width: 82 });
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const tabs = [
    { id: "preview" as const, label: "Preview", icon: Eye },
    { id: "code" as const, label: "Code", icon: Code2 },
  ];

  // Initialize indicator position after mount
  React.useEffect(() => {
    setMounted(true);
    const updateIndicator = () => {
      const container = containerRef.current;
      const activeButton = tabRefs.current.get(activeTab);
      if (!container || !activeButton) return;

      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    };

    requestAnimationFrame(updateIndicator);
  }, [activeTab]);

  const handleTabClick = (tabId: "preview" | "code") => {
    if (tabId === activeTab || isAnimating) return;

    const container = containerRef.current;
    const currentButton = tabRefs.current.get(activeTab);
    const targetButton = tabRefs.current.get(tabId);

    if (!container || !currentButton || !targetButton) {
      onTabChange(tabId);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const currentRect = currentButton.getBoundingClientRect();
    const targetRect = targetButton.getBoundingClientRect();

    const currentLeft = currentRect.left - containerRect.left;
    const targetLeft = targetRect.left - containerRect.left;
    const currentRight = currentLeft + currentRect.width;
    const targetRight = targetLeft + targetRect.width;

    // Determine direction: moving right (preview → code) or left (code → preview)
    const movingRight = targetLeft > currentLeft;

    setIsAnimating(true);

    // Phase 1: Expand - leading edge moves first, trailing edge stays
    if (movingRight) {
      // Moving right: right edge expands to target, left edge stays
      setIndicatorStyle({
        left: currentLeft,
        width: targetRight - currentLeft,
      });
    } else {
      // Moving left: left edge expands to target, right edge stays
      setIndicatorStyle({
        left: targetLeft,
        width: currentRight - targetLeft,
      });
    }

    // Phase 2: Shrink - trailing edge catches up
    setTimeout(() => {
      setIndicatorStyle({
        left: targetLeft,
        width: targetRect.width,
      });
      onTabChange(tabId);
      setTimeout(() => setIsAnimating(false), 150);
    }, 150);
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center gap-0.5 p-1 bg-muted/50 rounded-t-xl border border-b-0 border-border w-fit"
    >
      {/* Animated indicator */}
      <motion.div
        className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          opacity: mounted ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            if (el) tabRefs.current.set(tab.id, el);
          }}
          onClick={() => handleTabClick(tab.id)}
          suppressHydrationWarning
          className={clsx(
            "relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.icon className="w-3.5 h-3.5" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function CodePreview({
  preview,
  code,
  jsxCode,
  className,
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [currentLang, setCurrentLang] = useState<"tsx" | "jsx">("tsx");

  const displayCode = currentLang === "jsx" ? (jsxCode || convertToJsx(code)) : code;

  return (
    <div className={clsx("space-y-0", className)}>
      {/* Animated Tabs */}
      <AnimatedTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className={clsx(
        "rounded-xl rounded-tl-none border border-border",
        activeTab === "code" && "overflow-hidden"
      )}>
        {activeTab === "preview" ? (
          <div className="p-6 bg-card/50 min-h-[120px]">
            {preview}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <LanguageToggle
                language={currentLang}
                onToggle={() => setCurrentLang(currentLang === "tsx" ? "jsx" : "tsx")}
              />
              <CopyButton code={displayCode} />
            </div>
            <CodeRenderer code={displayCode} language={currentLang} />
          </div>
        )}
      </div>
    </div>
  );
}
