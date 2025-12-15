import { Skeleton } from "@/components/ui/skeleton";

export default function DocsLoading() {
  return (
    <div className="flex gap-16 animate-pulse">
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Skeleton className="h-10 w-48 mb-3" />
          <Skeleton className="h-6 w-full max-w-md" />
        </div>

        {/* Content sections */}
        <div className="space-y-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* TOC skeleton */}
      <div className="hidden xl:block w-52 shrink-0">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
