"use client";

import { ReactNode, useEffect, useState } from "react";

interface TerminalSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function TerminalSection({ title, children, delay = 0 }: TerminalSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCommand, setCurrentCommand] = useState("");
  const command = `cat ${title.toLowerCase().replace(/\s+/g, "_")}.txt`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Typewriter effect for command
      let i = 0;
      const typeCommand = () => {
        if (i < command.length) {
          setCurrentCommand(command.slice(0, i + 1));
          i++;
          setTimeout(typeCommand, 50);
        }
      };
      typeCommand();
    }, delay);

    return () => clearTimeout(timer);
  }, [command, delay]);

  return (
    <div className="bg-black text-green-400 font-mono text-sm border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] mb-6">
      {/* Terminal Header */}
      <div className="bg-gray-300 border-b border-gray-400 px-3 py-1 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full border border-red-700"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-700"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full border border-green-700"></div>
        <div className="text-black text-xs ml-2 font-bold">Terminal</div>
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 min-h-[120px]">
        <div className="mb-2">
          <span className="text-blue-400">mahendra@retro-mac</span>
          <span className="text-white">:</span>
          <span className="text-yellow-400">~/resume</span>
          <span className="text-white">$ </span>
          <span className="border-r border-green-400 animate-pulse">{currentCommand}</span>
        </div>
        
        {isVisible && (
          <div className="animate-fadeIn">
            <div className="text-cyan-400 font-bold mb-2 uppercase tracking-wider">
              === {title} ===
            </div>
            <div className="text-green-300">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}