"use client";

import { PageWrapper } from "@/components/page-transition";

export default function DocsPage() {
  return (
    <PageWrapper>
      <div className="prose prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">Introduction</h1>
        <p className="text-lg text-default-500 mb-8">
          Welcome to SparkUI — a collection of premium UI components built with
          Tailwind CSS and Framer Motion. Copy, paste, and customize.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What is SparkUI?</h2>
        <p className="text-default-600 mb-4">
          SparkUI is not a component library you install via npm. It&apos;s a collection
          of re-usable components that you can copy and paste into your apps.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <ul className="list-disc list-inside space-y-2 text-default-600">
          <li>✦ Beautiful, animated components</li>
          <li>✦ Built with Tailwind CSS v4</li>
          <li>✦ Framer Motion animations</li>
          <li>✦ Dark mode support</li>
          <li>✦ Fully responsive</li>
          <li>✦ Zero dependencies (just Tailwind + Framer Motion)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Quick Start</h2>
        <p className="text-default-600 mb-4">
          Browse the components in the sidebar, find what you need, and copy the code
          directly into your project.
        </p>
      </div>
    </PageWrapper>
  );
}
