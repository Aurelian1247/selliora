import { DashboardSidebar } from "../../components/layout/dashboard-sidebar";
import { DashboardProtection } from "../../components/auth/dashboard-protection";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProtection>
      <main className="min-h-screen bg-[#050816] text-white">
        <div className="flex min-h-screen">
          <DashboardSidebar />
          <div className="flex-1">
            <div className="border-b border-white/10 bg-white/5 px-4 py-4 md:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-white/45">Selliora AI</p>
                  <h1 className="text-lg font-semibold text-white">Dashboard</h1>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                  Generation is available on desktop only.

                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">{children}</div>
          </div>
        </div>
      </main>
    </DashboardProtection>
  );
}