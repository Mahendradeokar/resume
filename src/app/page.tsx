"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import RetroMacWindow from "~/components/RetroMacWindow";
import PixelButton from "~/components/PixelButton";
import RetroIcon from "~/components/RetroIcon";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="retro-desktop flex min-h-screen flex-col bg-gray-300">
      {/* Menu Bar */}
      <div className="flex items-center justify-between border-b-2 border-black bg-white p-2">
        <div className="font-chicago flex items-center gap-2 text-sm font-bold text-black">
          🍎 Resume System 1.0
        </div>
        <div className="font-mono text-sm font-bold text-black">
          {currentTime}
        </div>
      </div>

      {/* Desktop */}
      <div className="flex flex-1 items-center justify-center p-8">
        <RetroMacWindow
          title="Resume Viewer"
          isActive={true}
          className="retro-slide-in"
        >
          <div className="min-w-md text-center">
            <div className="mac-shadow mx-auto mb-4 flex h-16 w-16 items-center justify-center border-2 border-black bg-blue-500">
              {/* <RetroIcon type="folder" size="lg" className="text-white" /> */}
              MD
            </div>

            <h2 className="font-chicago mb-2 text-lg font-bold text-gray-600">
              Mahendra Devkar
            </h2>

            <p className="mb-6 font-mono text-sm text-gray-600">
              JavaScript • React • Next.js
            </p>

            <div className="space-y-3">
              <Link href="/mahendra-devkar">
                <PixelButton size="lg" className="w-full">
                  {/* <RetroIcon type="external" size="sm" className="mr-2" /> */}
                  Open Resume
                </PixelButton>
              </Link>
            </div>
          </div>
        </RetroMacWindow>
      </div>

      {/* Dock/Taskbar */}
      <div className="fixed right-0 bottom-0 left-0 border-t-2 border-black bg-gray-200 p-2">
        <div className="flex items-center justify-center gap-4">
          <div className="mac-shadow flex h-8 w-8 items-center justify-center border border-black bg-blue-500">
            {/* <RetroIcon type="folder" size="sm" className="text-white" /> */}
          </div>
          <div className="mac-shadow flex h-8 w-8 items-center justify-center border border-black bg-green-500">
            <RetroIcon type="terminal" size="sm" className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
