"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface TocItem {
  id: string;
  title: string;
}

interface TocProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <nav className="relative">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">On This Page</p>
      </div>
      <div 
        className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)',
        }}
      >
        <div className="space-y-0.5 py-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={clsx(
                "block text-[13px] py-1 pl-3 border-l transition-all duration-150",
                activeId === item.id
                  ? "border-primary text-primary font-medium bg-primary/5 rounded-r-md"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              )}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
