import BrowserFrame from "./BrowserFrame";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DashboardContent from "./DashboardContent";

export default function MarketingDashboardPreview() {
  return (
    <div className="relative ml-auto flex w-full max-w-[560px] items-center">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[4rem] bg-cyan-400/10 blur-3xl" />

      <div
        className="
          w-full
          overflow-hidden
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
          <div className="flex h-[560px] min-w-0 overflow-hidden rounded-b-2xl bg-white">
            {/* Sidebar */}
            <div className="h-full w-[155px] min-w-[155px] shrink-0">
              <Sidebar />
            </div>

            {/* Main Dashboard */}
            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
              <Topbar compact />

              <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
                <DashboardContent compact />
              </div>
            </div>
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
}