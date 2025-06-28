"use client";

import { ReactNode } from "react";

interface RetroMacWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  isActive?: boolean;
}

export default function RetroMacWindow({
  title,
  children,
  className = "",
  isActive = true,
}: RetroMacWindowProps) {
  return (
    <div
      className={`border-2 border-black bg-gray-200 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${className} `}
    >
      {/* Title Bar */}
      <div
        className={`bg-gradient-to-r ${isActive ? "from-blue-600 to-blue-500" : "from-gray-400 to-gray-300"} flex items-center justify-between border-b-2 border-black px-4 py-2 select-none`}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center border border-black bg-white">
            <div className="h-2 w-2 bg-black"></div>
          </div>
          <div className="h-4 w-4 border border-black bg-white"></div>
        </div>

        {/* Title */}
        <div
          className={`text-xs font-bold tracking-wider uppercase ${isActive ? "text-white" : "text-gray-600"} `}
        >
          {title}
        </div>

        {/* Close Button */}
        <div className="flex h-4 w-4 cursor-pointer items-center justify-center border border-black bg-white hover:bg-gray-100">
          <div className="text-xs font-bold">×</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>
    </div>
  );
}
