"use client";

import { type ReactNode, useEffect, useState } from "react";

interface TerminalSectionProps {
  title: string;
  children: ReactNode;
  delay?: number;
}

export default function TerminalSection({
  title,
  children,
  delay = 0,
}: TerminalSectionProps) {
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
    <div className="mb-6 border-2 border-gray-400 bg-black font-mono text-sm text-green-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-gray-400 bg-gray-300 px-3 py-1">
        <div className="h-3 w-3 rounded-full border border-red-700 bg-red-500"></div>
        <div className="h-3 w-3 rounded-full border border-yellow-700 bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full border border-green-700 bg-green-500"></div>
        <div className="ml-2 text-xs font-bold text-black">Terminal</div>
      </div>

      {/* Terminal Content */}
      <div className="min-h-[120px] p-4">
        <div className="mb-2">
          <span className="text-blue-400">mahendra@retro-mac</span>
          <span className="text-white">:</span>
          <span className="text-yellow-400">~/resume</span>
          <span className="text-white">$ </span>
          <span className="animate-pulse border-r border-green-400">
            {currentCommand}
          </span>
        </div>

        {isVisible && (
          <div className="animate-fadeIn">
            <div className="mb-2 font-bold tracking-wider text-cyan-400 uppercase">
              === {title} ===
            </div>
            <div className="text-green-300">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
}
