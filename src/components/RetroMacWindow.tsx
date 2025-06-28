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
  isActive = true 
}: RetroMacWindowProps) {
  return (
    <div className={`
      bg-gray-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
      font-mono text-sm
      ${className}
    `}>
      {/* Title Bar */}
      <div className={`
        bg-gradient-to-r ${isActive ? 'from-blue-600 to-blue-500' : 'from-gray-400 to-gray-300'}
        border-b-2 border-black px-4 py-2 flex items-center justify-between
        select-none
      `}>
        {/* Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-black flex items-center justify-center">
            <div className="w-2 h-2 bg-black"></div>
          </div>
          <div className="w-4 h-4 bg-white border border-black"></div>
        </div>
        
        {/* Title */}
        <div className={`
          font-bold text-xs uppercase tracking-wider
          ${isActive ? 'text-white' : 'text-gray-600'}
        `}>
          {title}
        </div>
        
        {/* Close Button */}
        <div className="w-4 h-4 bg-white border border-black flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <div className="text-xs font-bold">×</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}