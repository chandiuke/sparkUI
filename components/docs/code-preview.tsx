"use client";

import React, { useState, ReactNode, useRef, useEffect, memo, lazy, Suspense } from "react";
import { clsx } from "clsx";

// Lazy load the heavy syntax highlighter - only loads when code tab is clicked
const CodeHighlighter = lazy(() => 
  import("./code-highlighter").then(mod => ({ default: mod.default }))
);

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

// Simple icons to avoid lucide-react import
const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

// Code loading placeholder
function CodePlaceholder() {
  return (
    <div className="p-4 bg-[rgb(17,17,17)] min-h-[100px]">
      <div className="space-y-2">
        <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-white/5 rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
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
      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-gray-200 transition-all"
      aria-label="Copy code"
      suppressHydrationWarning
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
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
      <span className={language === "tsx" ? "text-blue-400" : "text-gray-500"}>TS</span>
      <span className="text-gray-600">/</span>
      <span className={language === "jsx" ? "text-yellow-400" : "text-gray-500"}>JS</span>
    </button>
  );
}


// Auto-convert TSX to JSX by removing type annotations
function convertToJsx(tsxCode: string): string {
  return tsxCode
    .replace(/import\s+type\s+.*?from\s+['"].*?['"];?\n?/g, "")
    .replace(/,?\s*type\s+\w+/g, "")
    .replace(/interface\s+\w+\s*\{[\s\S]*?\}\n*/g, "")
    .replace(/type\s+\w+\s*=[\s\S]*?;\n*/g, "")
    .replace(/(useState|useRef|useCallback|useMemo|useContext)<[^>]+>/g, "$1")
    .replace(/\s+as\s+\w+(\[\])?/g, "")
    .replace(/\):\s*[A-Za-z\[\]<>,\s\|\.]+\s*(?==>|\{)/g, ") ")
    .replace(/(const|let|var)\s+(\w+):\s*[A-Za-z\[\]<>,\s\|\.]+\s*=/g, "$1 $2 =")
    .replace(/\(([^)]*)\)\s*=>/g, (_, params) => {
      const cleanParams = params.replace(/:\s*[A-Za-z\[\]<>,\s\|\.]+/g, "");
      return `(${cleanParams}) =>`;
    })
    .replace(/import\s*\{\s*\}\s*from\s*['"].*?['"];?\n?/g, "")
    .replace(/\{\s*,/g, "{")
    .replace(/,\s*\}/g, "}")
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
      <Suspense fallback={<CodePlaceholder />}>
        <CodeHighlighter code={displayCode} language={currentLang === "jsx" ? "jsx" : language} />
      </Suspense>
    </div>
  );
}

// Animated tabs - simplified
function AnimatedTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: "preview" | "code";
  onTabChange: (tab: "preview" | "code") => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 4, width: 82 });
  const [mounted, setMounted] = useState(false);

  const tabs = [
    { id: "preview" as const, label: "Preview", Icon: EyeIcon },
    { id: "code" as const, label: "Code", Icon: CodeIcon },
  ];

  useEffect(() => {
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

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center gap-0.5 p-1 bg-muted/50 rounded-t-xl border border-b-0 border-border w-fit"
    >
      <div
        className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm transition-all duration-150 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width, opacity: mounted ? 1 : 0 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
          onClick={() => onTabChange(tab.id)}
          suppressHydrationWarning
          className={clsx(
            "relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
            activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <tab.Icon />
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
  const [hasLoadedCode, setHasLoadedCode] = useState(false);

  const displayCode = currentLang === "jsx" ? (jsxCode || convertToJsx(code)) : code;

  // Only load syntax highlighter when code tab is clicked
  const handleTabChange = (tab: "preview" | "code") => {
    setActiveTab(tab);
    if (tab === "code") setHasLoadedCode(true);
  };

  return (
    <div className={clsx("space-y-0", className)}>
      <AnimatedTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className={clsx(
        "rounded-xl rounded-tl-none border border-border",
        activeTab === "code" && "overflow-hidden"
      )}>
        {activeTab === "preview" ? (
          <div className="p-6 bg-card/50 min-h-[120px]">{preview}</div>
        ) : (
          <div className="relative">
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <LanguageToggle
                language={currentLang}
                onToggle={() => setCurrentLang(currentLang === "tsx" ? "jsx" : "tsx")}
              />
              <CopyButton code={displayCode} />
            </div>
            {hasLoadedCode && (
              <Suspense fallback={<CodePlaceholder />}>
                <CodeHighlighter code={displayCode} language={currentLang} />
              </Suspense>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Lazy-loaded code block that only renders when visible
export function LazyCodeBlock({
  code,
  jsxCode,
  language = "tsx",
  className,
  showCopy = true,
}: CodeBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState<"tsx" | "jsx">("tsx");
  const hasJsx = jsxCode !== undefined || language === "tsx";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const displayCode = currentLang === "jsx" ? (jsxCode || convertToJsx(code)) : code;

  return (
    <div ref={ref} className={clsx("relative group rounded-xl overflow-hidden", className)}>
      {isVisible ? (
        <>
          <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
            {hasJsx && (
              <LanguageToggle
                language={currentLang}
                onToggle={() => setCurrentLang(currentLang === "tsx" ? "jsx" : "tsx")}
              />
            )}
            {showCopy && <CopyButton code={displayCode} />}
          </div>
          <Suspense fallback={<CodePlaceholder />}>
            <CodeHighlighter code={displayCode} language={currentLang === "jsx" ? "jsx" : language} />
          </Suspense>
        </>
      ) : (
        <div className="h-32 bg-[rgb(17,17,17)] animate-pulse" />
      )}
    </div>
  );
}

export const MemoizedCodePreview = memo(CodePreview);
export const MemoizedCodeBlock = memo(CodeBlock);
