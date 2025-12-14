import { Sidebar, MobileSidebar } from "@/components/docs/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 top-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:block w-56 border-r border-divider overflow-y-auto py-6 px-4">
        <Sidebar />
      </aside>
      {/* Content */}
      <main className="flex-1 overflow-y-auto py-6 px-8">{children}</main>
      <MobileSidebar />
    </div>
  );
}
