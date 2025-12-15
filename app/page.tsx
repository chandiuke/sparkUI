"use client";

import { Chip } from "@/components/ui/chip";
import { TransitionButton } from "@/components/page-transition";
import { HoverFlipButton } from "@/components/ui/hover-flip-button";
import { HeroTextReveal } from "@/components/ui/hero-text-reveal";
import { ScrollCodeShowcase } from "@/components/scroll-code-showcase";

export default function Home() {
  return (
    <>
      {/* Background gradient orbs */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="absolute rounded-full"
          style={{
            top: "10%",
            left: "10%",
            width: "500px",
            height: "500px",
            background: "rgba(141, 38, 255, 0.25)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "rgba(0, 102, 255, 0.2)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "800px",
            background: "rgba(141, 38, 255, 0.1)",
            filter: "blur(150px)",
          }}
        />
      </div>

      <section className="relative flex flex-col items-center min-h-[90vh] w-full z-10 pt-4 md:pt-8 pb-16">
        {/* Badge */}
        <Chip
          variant="flat"
          color="secondary"
          className="mb-8 px-4 py-2"
          startContent={<span className="text-lg">✦</span>}
        >
          SparkUI
        </Chip>

        {/* Main heading */}
        <div className="text-center max-w-5xl px-6">
          <h1>
            <HeroTextReveal
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              lines={[
                { text: "Premium UI Components" },
                {
                  text: "Ready to Copy & Paste",
                  className: "text-gradient",
                },
              ]}
              lineDuration={1.2}
              sparkGap={40}
              
                sparkChar="✦"
  sparkColor="#fff"
  sparkGlow="rgba(255, 255, 255, 0.8)"
              sparkPulse={true}
            />
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-10 text-lg md:text-2xl text-default-500 text-center max-w-3xl px-6 leading-relaxed">
          Beautiful components and blocks built with Tailwind + Framer Motion.
          Fully responsive, dark mode ready, and free to use.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-14 justify-center px-6">
          <HoverFlipButton
            href="/docs"
            text="Browse Components"
            hoverText="Let's Go ✦"
            color="primary"
            variant="shadow"
            size="lg"
            radius="full"
          />
          <TransitionButton
            href="/blocks"
            variant="bordered"
            size="lg"
            radius="full"
          >
            View Blocks
          </TransitionButton>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-12 md:gap-24 mt-20 justify-center">
          {[
            { value: "50+", label: "Components" },
            { value: "20+", label: "Blocks" },
            { value: "100%", label: "Free" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div 
                className="text-4xl md:text-5xl font-bold"
                style={{
                  background: "linear-gradient(to bottom, hsl(var(--foreground)), hsl(var(--foreground) / 0.5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-default-500 text-base mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll Code Showcase */}
      <ScrollCodeShowcase />
    </>
  );
}
