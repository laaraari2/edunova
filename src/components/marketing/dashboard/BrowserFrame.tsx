import { ReactNode } from "react";

type BrowserFrameProps = {
  children: ReactNode;
};

export default function BrowserFrame({
  children,
}: BrowserFrameProps) {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200
        bg-white
        shadow-[0_30px_80px_rgba(15,23,42,0.16)]
      "
    >
      {/* Browser Chrome */}
      <div className="flex h-12 items-center border-b border-slate-200 bg-slate-50 px-4 sm:px-5">
        {/* Traffic lights */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {/* Address bar */}
        <div
          className="
            mx-auto
            flex
            h-8
            min-w-0
            w-[55%]
            max-w-[340px]
            items-center
            justify-center
            truncate
            rounded-lg
            border
            border-slate-200
            bg-white
            px-3
            text-[10px]
            text-slate-500
            shadow-sm
            sm:text-xs
          "
        >
          https://app.edunova.ai
        </div>

        {/* Right spacer */}
        <div className="w-[20px] shrink-0 sm:w-[52px]" />
      </div>

      {/* Application */}
      {children}
    </div>
  );
}