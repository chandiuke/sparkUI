"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Code sequence - each step is a full code state
const codeSequence = [
  // Button demos
  { component: "button", code: `<Button
  color="primary"
  variant="shadow"
  size="lg"
  radius="full"
  isLoading
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="primary"
  variant="shadow"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="success"
  variant="shadow"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="danger"
  variant="shadow"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="warning"
  variant="shadow"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="secondary"
  variant="solid"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  { component: "button", code: `<Button
  color="secondary"
  variant="bordered"
  size="lg"
  radius="full"
>
  Get Started
</Button>` },
  // Input demos
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="primary"
  variant="default"
/>` },
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="success"
  variant="default"
/>` },
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="danger"
  variant="default"
/>` },
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="danger"
  variant="filled"
/>` },
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="primary"
  variant="underline"
/>` },
  { component: "input", code: `<Input
  label="Message"
  value="Watch me shine ✦"
  color="secondary"
  variant="flat"
/>` },
];


// Find which line contains a given character position
function getLineAtPosition(code: string, position: number): number {
  if (!code || position <= 0) return 0;
  const textBeforePosition = code.slice(0, position);
  return (textBeforePosition.match(/\n/g) || []).length;
}

// Calculate the visible code based on scroll progress
function getVisibleCode(progress: number): { code: string; component: string; editPosition: number } {
  const totalSteps = codeSequence.length;
  
  if (progress >= 1) {
    const lastCode = codeSequence[totalSteps - 1];
    return { ...lastCode, editPosition: lastCode.code.length };
  }
  if (progress <= 0) return { code: "", component: "button", editPosition: 0 };
  
  const stepSize = 1 / totalSteps;
  const currentStepIndex = Math.min(Math.floor(progress / stepSize), totalSteps - 1);
  const stepProgress = Math.min((progress - currentStepIndex * stepSize) / stepSize, 1);
  
  const currentComponent = codeSequence[currentStepIndex].component;
  
  if (currentStepIndex === 0) {
    const targetCode = codeSequence[0].code;
    const charIndex = Math.floor(stepProgress * targetCode.length);
    return { code: targetCode.slice(0, charIndex), component: currentComponent, editPosition: charIndex };
  }
  
  const fromCode = codeSequence[currentStepIndex - 1].code;
  const toCode = codeSequence[currentStepIndex].code;
  const fromComponent = codeSequence[currentStepIndex - 1].component;
  
  // If switching components, type fresh but keep showing old component until new one is complete
  if (fromComponent !== currentComponent) {
    const charIndex = Math.floor(stepProgress * toCode.length);
    const partialCode = toCode.slice(0, charIndex);
    // Keep showing old component until the new component tag is closed (/>)
    const isNewComponentComplete = partialCode.includes("/>");
    return { 
      code: partialCode, 
      component: isNewComponentComplete ? currentComponent : fromComponent,
      editPosition: charIndex
    };
  }
  
  // Find difference points
  let diffStart = 0;
  while (diffStart < fromCode.length && diffStart < toCode.length && fromCode[diffStart] === toCode[diffStart]) {
    diffStart++;
  }
  
  let fromEnd = fromCode.length;
  let toEnd = toCode.length;
  while (fromEnd > diffStart && toEnd > diffStart && fromCode[fromEnd - 1] === toCode[toEnd - 1]) {
    fromEnd--;
    toEnd--;
  }
  
  const deleteChars = fromEnd - diffStart;
  const addChars = toEnd - diffStart;
  const totalChars = deleteChars + addChars;
  
  if (totalChars === 0) return { code: toCode, component: currentComponent, editPosition: toCode.length };
  
  const charProgress = stepProgress * totalChars;
  
  if (charProgress < deleteChars) {
    // Deleting phase - cursor is at the delete position
    const charsDeleted = Math.floor(charProgress);
    const editPos = fromEnd - charsDeleted;
    return { code: fromCode.slice(0, editPos) + fromCode.slice(fromEnd), component: currentComponent, editPosition: editPos };
  } else {
    // Adding phase - cursor is at the add position
    const charsAdded = Math.floor(charProgress - deleteChars);
    const editPos = diffStart + charsAdded;
    if (stepProgress >= 0.99) return { code: toCode, component: currentComponent, editPosition: toCode.length };
    return { code: toCode.slice(0, editPos) + toCode.slice(toEnd), component: currentComponent, editPosition: editPos };
  }
}


// Parse Button props
function parseButtonProps(code: string) {
  const props: any = { children: "Button" };
  
  const colorMatch = code.match(/color="(primary|secondary|success|warning|danger)"/);
  if (colorMatch) props.color = colorMatch[1];
  
  const variantMatch = code.match(/variant="(solid|bordered|flat|ghost|shadow|faded|outline)"/);
  if (variantMatch) props.variant = variantMatch[1];
  
  const sizeMatch = code.match(/size="(sm|md|lg|icon)"/);
  if (sizeMatch) props.size = sizeMatch[1];
  
  const radiusMatch = code.match(/radius="(none|sm|md|lg|full)"/);
  if (radiusMatch) props.radius = radiusMatch[1];
  
  if (code.includes("isLoading")) props.loading = true;
  
  const childrenMatch = code.match(/>\s*([^<]+)\s*<\/Button>/);
  if (childrenMatch) props.children = childrenMatch[1].trim();
  
  return props;
}

// Parse Input props
function parseInputProps(code: string) {
  const props: any = {};
  
  const labelMatch = code.match(/label="([^"]+)"/);
  if (labelMatch) props.label = labelMatch[1];
  
  const placeholderMatch = code.match(/placeholder="([^"]+)"/);
  if (placeholderMatch) props.placeholder = placeholderMatch[1];
  
  const valueMatch = code.match(/value="([^"]+)"/);
  if (valueMatch) props.value = valueMatch[1];
  
  const colorMatch = code.match(/color="(primary|secondary|success|warning|danger)"/);
  if (colorMatch) props.color = colorMatch[1];
  
  const variantMatch = code.match(/variant="(default|filled|underline|ghost|flat)"/);
  if (variantMatch) props.variant = variantMatch[1];
  
  const sizeMatch = code.match(/size="(sm|md|lg)"/);
  if (sizeMatch) props.size = sizeMatch[1];
  
  return props;
}

// Code block with syntax highlighting and active line glow
function CodeBlock({ code, activeLine }: { code: string; activeLine: number }) {
  return (
    <Highlight theme={themes.nightOwl} code={code} language="tsx">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, background: "transparent", margin: 0, padding: 0 }}
          className="text-sm leading-relaxed"
        >
          {tokens.map((line, i) => {
            const isActive = i === activeLine;
            return (
              <div
                key={i}
                {...getLineProps({ line })}
                className={`table-row transition-all duration-200 ${
                  isActive ? "bg-primary/10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : ""
                }`}
                style={{
                  borderRadius: isActive ? "4px" : undefined,
                }}
              >
                <span className={`table-cell pr-4 text-right select-none w-6 text-xs transition-colors ${
                  isActive ? "text-primary" : "text-gray-600"
                }`}>
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            );
          })}
          <span className="inline-block w-0.5 h-4 bg-primary animate-pulse align-middle" />
        </pre>
      )}
    </Highlight>
  );
}


export function ScrollCodeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCode, setVisibleCode] = useState("");
  const [currentComponent, setCurrentComponent] = useState<string>("button");
  const [progress, setProgress] = useState(0);
  const [editPosition, setEditPosition] = useState(0);
  
  // Track last valid props for smooth transitions
  const lastButtonPropsRef = useRef<any>({});
  const lastInputPropsRef = useRef<any>({});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const result = getVisibleCode(latest);
    setVisibleCode(result.code);
    setCurrentComponent(result.component);
    setProgress(latest);
    setEditPosition(result.editPosition);
  });

  const handleSkip = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.bottom - window.innerHeight;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  // Parse props based on current component
  const currentProps = useMemo(() => {
    if (currentComponent === "button") {
      const props = parseButtonProps(visibleCode);
      if (props.color) lastButtonPropsRef.current.color = props.color;
      if (props.variant) lastButtonPropsRef.current.variant = props.variant;
      if (props.size) lastButtonPropsRef.current.size = props.size;
      if (props.radius) lastButtonPropsRef.current.radius = props.radius;
      
      return {
        ...props,
        color: props.color || lastButtonPropsRef.current.color,
        variant: props.variant || lastButtonPropsRef.current.variant,
        size: props.size || lastButtonPropsRef.current.size,
        radius: props.radius || lastButtonPropsRef.current.radius,
      };
    } else {
      const props = parseInputProps(visibleCode);
      if (props.color) lastInputPropsRef.current.color = props.color;
      if (props.variant) lastInputPropsRef.current.variant = props.variant;
      
      return {
        ...props,
        color: props.color || lastInputPropsRef.current.color,
        variant: props.variant || lastInputPropsRef.current.variant,
      };
    }
  }, [visibleCode, currentComponent]);

  const activeLine = getLineAtPosition(visibleCode, editPosition);

  return (
    <section ref={containerRef} className="relative h-[2400vh]">
      <div className="sticky top-0 h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge color="primary" variant="flat" className="mb-3">
              Live Preview
            </Badge>
            <h2 className="text-2xl font-bold">
              Watch props <span className="text-gradient">come alive</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Components update as each prop completes typing
            </p>
          </div>

          {/* Split view */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Preview */}
            <motion.div className="rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="flex-1 text-center text-xs text-muted-foreground">
                  Live Preview — {currentComponent === "button" ? "Button" : "Input"}
                </span>
              </div>
              <div className="p-12 min-h-[300px] flex items-center justify-center">
                {currentComponent === "button" ? (
                  <motion.div
                    layout
                    transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
                  >
                    <Button
                      color={currentProps.color}
                      variant={currentProps.variant}
                      size={currentProps.size}
                      radius={currentProps.radius}
                      loading={currentProps.loading}
                      className="transition-all duration-300 ease-out"
                    >
                      {currentProps.children || "Button"}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    transition={{ layout: { duration: 0.3, ease: "easeOut" } }}
                    className="w-full max-w-xs"
                  >
                    <Input
                      label={currentProps.label}
                      placeholder={currentProps.placeholder}
                      value={currentProps.value}
                      color={currentProps.color}
                      variant={currentProps.variant}
                      size={currentProps.size}
                      className="transition-all duration-300 ease-out"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* Current props display */}
              <div className="px-4 py-3 border-t border-border bg-muted/30 text-xs font-mono text-muted-foreground">
                <span className="text-foreground">Props: </span>
                {currentProps.color && <span className="text-primary">color="{currentProps.color}" </span>}
                {currentProps.variant && <span className="text-secondary">variant="{currentProps.variant}" </span>}
                {currentProps.size && <span className="text-success">size="{currentProps.size}" </span>}
                {currentProps.radius && <span className="text-warning">radius="{currentProps.radius}" </span>}
                {currentProps.loading && <span className="text-danger">isLoading </span>}
                {currentProps.label && <span className="text-primary">label="{currentProps.label}" </span>}
              </div>
            </motion.div>


            {/* Code */}
            <motion.div className="rounded-2xl border border-border overflow-hidden shadow-lg bg-[#011627]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="flex-1 text-center text-xs text-gray-400 font-mono">
                  App.tsx
                </span>
              </div>
              <div className="p-6 min-h-[300px]">
                <CodeBlock code={visibleCode || " "} activeLine={activeLine} />
              </div>
              
              {/* Progress */}
              <div className="px-4 py-3 border-t border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {Math.round(progress * 100)}%
                  </span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skip button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              Skip demo →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
