import BrowserFrame from "../dashboard/BrowserFrame";
import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import DashboardContent from "../dashboard/DashboardContent";

export default function MarketingDashboardPreview() {
  return (
    <div className="relative w-full max-w-[560px]">
      {/* Glow */}
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-cyan-400/10 blur-3xl" />

      <div
        className="
          rounded-[28px]
          border
          border-white/70
          bg-white/80
          p-2
          shadow-[0_35px_90px_rgba(15,23,42,0.18)]
          backdrop-blur-xl
          transition-all
          duration-500
          hover:-translate-y-1
          hover:shadow-[0_45px_110px_rgba(15,23,42,0.22)]
        "
      >
        <BrowserFrame>
          <div className="flex h-[500px] overflow-hidden rounded-b-2xl bg-white">
            {/* Sidebar */}
            <aside className="w-[170px] shrink-0 overflow-hidden border-r border-slate-200 bg-white">
              <Sidebar />
            </aside>

            {/* Right Content */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <Topbar />

              <div className="min-w-0 flex-1 overflow-hidden">
                <DashboardContent />
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}