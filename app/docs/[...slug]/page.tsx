"use client";

import { useParams } from "next/navigation";

export default function DocPage() {
  const params = useParams();
  const slug = params.slug as string[];
  const title = slug[slug.length - 1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-default-500">This page is coming soon...</p>
    </div>
  );
}
