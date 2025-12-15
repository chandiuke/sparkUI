"use client";

import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface LineConfig {
  text: string;
  className?: string;
  direction?: "ltr" | "rtl";
}

interface HeroTextRevealProps {
  lines: LineConfig[];
  className?: string;
  delay?: number;
  lineDuration?: number;
  travelDuration?: number;
  sparkGap?: number;
  sparkChar?: string;
  sparkColor?: string;
  sparkGlow?: string;
  sparkPulse?: boolean;
  sparkSize?: string;
  sparkRotation?: number;
  showSpark?: boolean;
  replayOnView?: boolean;
  lineHeight?: number;
  ease?: [number, number, number, number];
  onAnimationComplete?: () => void;
}

export function HeroTextReveal({
  lines,
  className,
  delay = 0.3,
  lineDuration = 1.2,
  travelDuration = 0.25,
  sparkGap = 8,
  sparkChar = "✦",
  sparkColor = "white",
  sparkGlow = "rgba(255,255,255,0.8)",
  sparkPulse = true,
  sparkSize,
  sparkRotation = 360,
  showSpark = true,
  replayOnView = false,
  lineHeight = 1.2,
  ease = [0.65, 0, 0.35, 1],
  onAnimationComplete,
}: HeroTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkRef = useRef<HTMLSpanElement>(null);
  const sparkControls = useAnimationControls();
  const isInView = useInView(containerRef, { once: !replayOnView, amount: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMounted = useRef(true);


  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  const normalizedLines = lines.map((line, i) => ({
    ...line,
    direction: line.direction || (i % 2 === 0 ? "ltr" : "rtl"),
  }));

  useEffect(() => {
    if (replayOnView && !isInView && hasAnimated) {
      sparkControls.set({ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 });
      setHasAnimated(false);
    }
  }, [isInView, replayOnView, hasAnimated, sparkControls]);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const lineEls = lineRefs.current.filter(Boolean) as HTMLSpanElement[];
    const sparkEl = sparkRef.current;
    const container = containerRef.current;
    if (lineEls.length !== normalizedLines.length || !sparkEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const measurements = lineEls.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
      };
    });
    const sparkWidth = sparkEl.offsetWidth;
    const sparkHeight = sparkEl.offsetHeight;

    const runAnimation = async () => {
      try {
        await new Promise((r) => setTimeout(r, delay * 1000));
        if (!isMounted.current) return;

        if (!showSpark) {
          const totalDuration = normalizedLines.length * lineDuration + (normalizedLines.length - 1) * travelDuration;
          await new Promise((r) => setTimeout(r, totalDuration * 1000));
          if (isMounted.current) {
            setHasAnimated(true);
            onAnimationComplete?.();
          }
          return;
        }

        let currentRotation = 0;

        for (let i = 0; i < normalizedLines.length; i++) {
          if (!isMounted.current) return;

          const line = normalizedLines[i];
          const m = measurements[i];
          const isLTR = line.direction === "ltr";

          const sparkStartX = isLTR
            ? m.left - sparkWidth / 2 + sparkGap
            : m.left + m.width - sparkWidth / 2 - sparkGap;

          const sparkEndX = isLTR
            ? m.left + m.width - sparkWidth / 2 + sparkGap
            : m.left - sparkWidth / 2 - sparkGap;

          const sparkY = m.top + (m.height - sparkHeight) / 2;
          const rotationAmount = isLTR ? sparkRotation : -sparkRotation;

          if (i === 0) {
            if (!isMounted.current) return;
            sparkControls.set({ x: sparkStartX, y: sparkY, opacity: 0, rotate: 0, scale: 1 });

            if (!isMounted.current) return;
            await sparkControls.start({
              x: sparkEndX,
              opacity: 1,
              rotate: rotationAmount,
              scale: sparkPulse ? [1, 1.15, 1] : 1,
              transition: {
                duration: lineDuration,
                ease,
                opacity: { duration: 0.15 },
                scale: sparkPulse ? { times: [0, 0.5, 1], ease: "easeInOut" } : undefined,
              },
            });
          } else {
            const travelRotation = isLTR ? sparkRotation * 0.5 : -sparkRotation * 0.5;

            if (!isMounted.current) return;
            await sparkControls.start({
              x: sparkStartX,
              y: sparkY,
              rotate: currentRotation + travelRotation,
              transition: { duration: travelDuration, ease: [0.4, 0, 0.2, 1] },
            });

            currentRotation += travelRotation;

            if (!isMounted.current) return;
            await sparkControls.start({
              x: sparkEndX,
              rotate: currentRotation + rotationAmount,
              scale: sparkPulse ? [1, 1.15, 1] : 1,
              transition: {
                duration: lineDuration,
                ease,
                scale: sparkPulse ? { times: [0, 0.5, 1], ease: "easeInOut" } : undefined,
              },
            });
          }

          currentRotation += rotationAmount;
        }

        if (showSpark && isMounted.current) {
          await sparkControls.start({ opacity: 0, scale: 0.5, transition: { duration: 0.2 } });
        }

        if (isMounted.current) {
          setHasAnimated(true);
          onAnimationComplete?.();
        }
      } catch {
        // Component unmounted
      }
    };

    runAnimation();
  }, [isInView, hasAnimated, normalizedLines, delay, lineDuration, travelDuration, sparkGap, sparkRotation, sparkPulse, showSpark, ease, sparkControls, onAnimationComplete]);

  const getMaskDelay = (index: number) => delay + index * (lineDuration + travelDuration);

  return (
    <span ref={containerRef} className={`relative block ${className || ""}`}>
      {normalizedLines.map((line, i) => {
        const isLTR = line.direction === "ltr";
        const maskDelay = getMaskDelay(i);
        const hasGradient = line.className?.includes("text-gradient");

        return (
          <span key={i}>
            {i > 0 && <br />}
            <span className="relative inline-flex" style={{ lineHeight }}>
              <span ref={(el) => { lineRefs.current[i] = el; }} className={`invisible ${line.className || ""}`}>
                {line.text}
              </span>
              <motion.span
                className={`absolute top-0 left-0 whitespace-nowrap ${line.className || ""}`}
                style={hasGradient ? {
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : undefined}
                initial={{ clipPath: isLTR ? "inset(-10% 100% -10% 0)" : "inset(-10% 0 -10% 100%)" }}
                animate={isInView ? { clipPath: "inset(-10% 0% -10% 0)" } : undefined}
                transition={{ duration: lineDuration, delay: maskDelay, ease }}
              >
                {line.text}
              </motion.span>
            </span>
          </span>
        );
      })}

      <motion.span
        ref={sparkRef}
        className={`absolute pointer-events-none will-change-transform ${!showSpark ? "hidden" : ""}`}
        style={{
          fontSize: sparkSize || "inherit",
          color: sparkColor,
          filter: `drop-shadow(0 0 8px ${sparkGlow})`,
          top: 0,
          left: 0,
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
        }}
        initial={{ opacity: 0 }}
        animate={sparkControls}
      >
        {sparkChar}
      </motion.span>
    </span>
  );
}
