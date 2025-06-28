"use client";

import { useEffect, useState } from "react";

interface RetroProgressBarProps {
  skill: string;
  percentage: number;
  delay?: number;
}

export default function RetroProgressBar({
  skill,
  percentage,
  delay = 0,
}: RetroProgressBarProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="mb-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-sm font-bold tracking-wider uppercase">
          {skill}
        </span>
        <span className="font-mono text-xs text-gray-600">{percentage}%</span>
      </div>

      <div className="retro-progress relative h-4 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              #000000 2px,
              #000000 4px
            )`,
            }}
          ></div>
        </div>

        {/* Progress fill */}
        <div
          className="retro-progress-fill relative h-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedPercentage}%` }}
        >
          {/* Highlight effect */}
          <div className="absolute top-0 left-0 h-1 w-full bg-white opacity-50"></div>

          {/* Animated stripes */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 4px,
              rgba(255,255,255,0.5) 4px,
              rgba(255,255,255,0.5) 8px
            )`,
              animation:
                animatedPercentage > 0 ? "slide 1s linear infinite" : "none",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 8px;
          }
        }
      `}</style>
    </div>
  );
}
