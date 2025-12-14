"use client";

import { motion, useAnimationControls, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface LineConfig {
  text: string;
  className?: string;
  direction?: "ltr" | "rtl";
}

interface HeroTextRevealProps {
  /** Array of text lines to animate */
  lines: LineConfig[];
  /** Container className - use for font size, weight, etc. */
  className?: string;
  /** Initial delay before animation starts (seconds) */
  delay?: number;
  /** Duration for each line reveal (seconds) */
  lineDuration?: number;
  /** Duration for spark travel between lines (seconds) */
  travelDuration?: number;
  /** Gap between spark and mask edge (pixels) - spark stays ahead */
  sparkGap?: number;
  /** Spark character/emoji */
  sparkChar?: string;
  /** Spark color */
  sparkColor?: string;
  /** Spark glow color */
  sparkGlow?: string;
  /** Enable spark scale pulse during animation */
  sparkPulse?: boolean;
  /** Spark font size (defaults to inherit) */
  sparkSize?: string;
  /** Rotation degrees per line */
  sparkRotation?: number;
  /** Show/hide the spark cursor */
  showSpark?: boolean;
  /** Replay animation when scrolling back into view */
  replayOnView?: boolean;
  /** Line height multiplier */
  lineHeight?: number;
  /** Custom easing curve [x1, y1, x2, y2] */
  ease?: [number, number, number, number];
  /** Callback when animation completes */
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
  const isInView = useInView(containerRef, {
    once: !replayOnView,
    amount: 0.5,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
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
    if (lineEls.length !== normalizedLines.length || !sparkEl || !container)
      return;

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
          const totalDuration =
            normalizedLines.length * lineDuration +
            (normalizedLines.length - 1) * travelDuration;
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

          // Spark position: stays AHEAD of the mask edge by sparkGap
          // For LTR: mask reveals from left, spark is at (maskEdge + sparkGap)
          // For RTL: mask reveals from right, spark is at (maskEdge - sparkWidth - sparkGap)
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
            sparkControls.set({
              x: sparkStartX,
              y: sparkY,
              opacity: 0,
              rotate: 0,
              scale: 1,
            });

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
                scale: sparkPulse
                  ? { times: [0, 0.5, 1], ease: "easeInOut" }
                  : undefined,
              },
            });
          } else {
            const travelRotation = isLTR
              ? sparkRotation * 0.5
              : -sparkRotation * 0.5;

            if (!isMounted.current) return;
            await sparkControls.start({
              x: sparkStartX,
              y: sparkY,
              rotate: currentRotation + travelRotation,
              transition: {
                duration: travelDuration,
                ease: [0.4, 0, 0.2, 1],
              },
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
                scale: sparkPulse
                  ? { times: [0, 0.5, 1], ease: "easeInOut" }
                  : undefined,
              },
            });
          }

          currentRotation += rotationAmount;
        }

        if (showSpark && isMounted.current) {
          await sparkControls.start({
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          });
        }

        if (isMounted.current) {
          setHasAnimated(true);
          onAnimationComplete?.();
        }
      } catch {
        // Component unmounted during animation
      }
    };

    runAnimation();
  }, [
    isInView,
    hasAnimated,
    normalizedLines,
    delay,
    lineDuration,
    travelDuration,
    sparkGap,
    sparkRotation,
    sparkPulse,
    showSpark,
    ease,
    sparkControls,
    onAnimationComplete,
  ]);

  const getMaskDelay = (index: number) => {
    return delay + index * (lineDuration + travelDuration);
  };

  return (
    <span ref={containerRef} className={`relative block ${className || ""}`}>
      {normalizedLines.map((line, i) => {
        const isLTR = line.direction === "ltr";
        const maskDelay = getMaskDelay(i);

        return (
          <span key={i}>
            {i > 0 && <br />}
            <span className="relative inline-flex" style={{ lineHeight }}>
              <span
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`invisible ${line.className || ""}`}
              >
                {line.text}
              </span>
              <motion.span
                className={`absolute top-0 left-0 whitespace-nowrap ${line.className || ""}`}
                initial={{
                  clipPath: isLTR
                    ? "inset(-10% 100% -10% 0)"
                    : "inset(-10% 0 -10% 100%)",
                }}
                animate={
                  isInView ? { clipPath: "inset(-10% 0% -10% 0)" } : undefined
                }
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

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Basic usage - alternating directions (ltr, rtl, ltr...)
<HeroTextReveal
  className="text-5xl font-bold"
  lines={[
    { text: "Beautiful UI Components" },
    { text: "Ready to Copy & Paste" },
  ]}
/>

// With gradient on second line
<HeroTextReveal
  className="text-4xl sm:text-5xl md:text-6xl font-bold"
  lines={[
    { text: "Welcome to the Future" },
    { text: "of Web Design", className: "bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent" },
  ]}
/>

// Custom directions (all same direction)
<HeroTextReveal
  className="text-4xl font-bold"
  lines={[
    { text: "Line One", direction: "ltr" },
    { text: "Line Two", direction: "ltr" },
    { text: "Line Three", direction: "ltr" },
  ]}
/>

// Three lines with mixed directions
<HeroTextReveal
  className="text-5xl font-black"
  lines={[
    { text: "Create" },
    { text: "Beautiful", className: "text-purple-500" },
    { text: "Experiences" },
  ]}
/>

// Full customization
<HeroTextReveal
  className="text-6xl font-bold tracking-tight"
  lines={[
    { text: "Welcome" },
    { text: "To Tomorrow", className: "text-gradient" },
  ]}
  delay={0.5}
  lineDuration={1.5}
  travelDuration={0.3}
  sparkGap={20}
  sparkChar="✦"
  sparkColor="#8d26ff"
  sparkGlow="rgba(141, 38, 255, 0.8)"
  sparkPulse={true}
  sparkRotation={360}
  showSpark={true}
  replayOnView={false}
  lineHeight={1.2}
  ease={[0.65, 0, 0.35, 1]}
  onAnimationComplete={() => console.log("Animation done!")}
/>

// Without spark (mask animation only)
<HeroTextReveal
  className="text-3xl"
  lines={[
    { text: "Simple text reveal" },
    { text: "Without the sparkle" },
  ]}
  showSpark={false}
/>

// Replay on scroll
<HeroTextReveal
  className="text-4xl font-bold"
  lines={[
    { text: "Scroll away" },
    { text: "And come back" },
  ]}
  replayOnView={true}
/>
*/
