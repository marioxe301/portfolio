import type { ReactNode } from "react";

type RpgWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function RpgWindow({ title, children, className = "" }: RpgWindowProps) {
  return (
    <div className={`bg-[#313244] border-2 md:border-4 border-[#45475a] ${className}`}>
      <div className="bg-[#45475a] border-b-2 md:border-b-4 border-[#45475a] px-3 md:px-4 py-2 md:py-3">
        <h2 className="text-[#f9e2af] text-[10px] md:text-xs truncate">{title}</h2>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}
