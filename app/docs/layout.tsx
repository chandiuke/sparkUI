import { Sidebar, MobileSidebar } from "@/components/docs/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar - sticky instead of fixed */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border/50 bg-background/80 backdrop-blur-xl sticky top-16 h-[calc(100vh-4rem)]">
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b border-border/50">
          <h2 className="font-semibold text-foreground">Documentation</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Learn how to use SparkUI</p>
        </div>
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <Sidebar />
        </div>
      </aside>

      {/* Main Content - no overflow clipping */}
      <main className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-8 lg:py-10">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar */}
      <MobileSidebar />
    </div>
  );
}
