import { Skeleton } from "@/components/ui/skeleton";

export default function ComponentLoading() {
  return (
    <div className="flex gap-16">
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Skeleton className="h-10 w-40 mb-3" />
          <Skeleton className="h-5 w-full max-w-lg" />
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-4 w-3/4" />
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="p-6 bg-card/50">
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div className="hidden xl:block w-52 shrink-0">
        <Skeleton className="h-4 w-20 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
