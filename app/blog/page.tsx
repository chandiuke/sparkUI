"use client";

import { title } from "@/components/primitives";
import { PageWrapper } from "@/components/page-transition";

export default function BlogPage() {
  return (
    <PageWrapper>
      <div>
        <h1 className={title({})}>Blog</h1>
      </div>
    </PageWrapper>
  );
}
