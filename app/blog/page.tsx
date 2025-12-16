"use client";

import { title } from "@/components/primitives";
import { PageWrapper } from "@/components/page-transition";

export default function BlogPage() {
  return (
    <PageWrapper>
      <main className="container mx-auto max-w-7xl pt-6 px-6 flex-grow pb-16">
        <div>
          <h1 className={title({})}>Blog</h1>
        </div>
      </main>
    </PageWrapper>
  );
}
