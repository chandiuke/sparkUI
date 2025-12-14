"use client";

import { title } from "@/components/primitives";
import { PageWrapper } from "@/components/page-transition";

export default function AboutPage() {
  return (
    <PageWrapper>
      <div>
        <h1 className={title({})}>About</h1>
      </div>
    </PageWrapper>
  );
}
