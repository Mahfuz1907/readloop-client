import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-950 overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-900 text-white h-screen overflow-hidden">
          {/* Top Navbar */}
          <header className="h-18 shrink-0 border-b border-slate-800 flex items-center px-4 bg-slate-950/80 backdrop-blur-md z-10">
            <SidebarTrigger className="text-slate-300 hover:text-white hover:bg-slate-800" />
          </header>

          {/* Scrollable Page Content */}
          <div className="flex-1 p-6 overflow-y-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
