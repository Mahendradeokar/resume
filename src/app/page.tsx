"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import RetroMacWindow from "~/components/RetroMacWindow";
import PixelButton from "~/components/PixelButton";
import RetroIcon from "~/components/RetroIcon";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("");
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    // Boot animation
    setTimeout(() => setIsBooted(true), 1000);
    
    // Clock
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { 
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isBooted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 pixelated">
            <div className="w-full h-full bg-white border-8 border-gray-400 flex items-center justify-center mac-shadow">
              <div className="w-16 h-16 bg-black flex items-center justify-center">
                <div className="text-white font-bold text-2xl">🍎</div>
              </div>
            </div>
          </div>
          <div className="font-mono text-green-400 text-xl">
            Welcome to Resume System 1.0
          </div>
          <div className="mt-4 font-mono text-gray-400 text-sm">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 retro-desktop">
      {/* Menu Bar */}
      <div className="bg-white border-b-2 border-black p-2 flex items-center justify-between">
        <div className="font-chicago text-sm font-bold flex items-center gap-2">
          🍎 Resume System 1.0
        </div>
        <div className="font-mono text-sm font-bold">
          {currentTime}
        </div>
      </div>

      {/* Desktop */}
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {/* Main Resume Window */}
          <RetroMacWindow 
            title="Resume Viewer" 
            isActive={true}
            className="retro-slide-in"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 border-2 border-black mac-shadow flex items-center justify-center">
                <RetroIcon type="folder" size="lg" className="text-white" />
              </div>
              
              <h2 className="font-chicago text-lg font-bold mb-2">
                Mahendra Devkar
              </h2>
              
              <p className="font-mono text-sm text-gray-600 mb-6">
                JavaScript Developer • React Expert • Next.js Specialist
              </p>
              
              <div className="space-y-3">
                <Link href="/mahendra-devkar">
                  <PixelButton size="lg" className="w-full">
                    <RetroIcon type="external" size="sm" className="mr-2" />
                    Open Resume
                  </PixelButton>
                </Link>
                
                <PixelButton 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => window.open("/Mahendra_Devkar_Resume.pdf", "_blank")}
                >
                  <RetroIcon type="download" size="sm" className="mr-2" />
                  Download PDF
                </PixelButton>
              </div>
            </div>
          </RetroMacWindow>

          {/* System Info Window */}
          <RetroMacWindow 
            title="System Info" 
            isActive={false}
            className="retro-fade-in"
          >
            <div className="space-y-4">
              <div className="font-mono text-sm">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>System:</div>
                  <div>Resume OS 1.0</div>
                  
                  <div>Memory:</div>
                  <div>512K RAM</div>
                  
                  <div>Storage:</div>
                  <div>400K Free</div>
                  
                  <div>Display:</div>
                  <div>Retro Mode</div>
                  
                  <div>Status:</div>
                  <div className="text-green-600">● Online</div>
                </div>
              </div>
              
              <div className="border-t border-gray-400 pt-4">
                <div className="font-mono text-xs text-gray-600">
                  <p className="mb-2">
                    Experience the nostalgia of classic Mac interfaces 
                    while browsing modern resume content.
                  </p>
                  <p>
                    Built with Next.js, TypeScript, and Tailwind CSS.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <PixelButton size="sm" variant="secondary" className="flex-1">
                  About
                </PixelButton>
                <PixelButton size="sm" variant="secondary" className="flex-1">
                  Help
                </PixelButton>
              </div>
            </div>
          </RetroMacWindow>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-20 left-4 space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-400 border-2 border-black mac-shadow flex items-center justify-center mb-1 cursor-pointer hover:bg-gray-300">
            <RetroIcon type="terminal" size="sm" />
          </div>
          <div className="font-mono text-xs">Terminal</div>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-400 border-2 border-black mac-shadow flex items-center justify-center mb-1 cursor-pointer hover:bg-gray-300">
            <RetroIcon type="folder" size="sm" />
          </div>
          <div className="font-mono text-xs">Projects</div>
        </div>
      </div>

      {/* Dock/Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 border-t-2 border-black p-2">
        <div className="flex items-center justify-center gap-4">
          <div className="w-8 h-8 bg-blue-500 border border-black mac-shadow flex items-center justify-center">
            <RetroIcon type="folder" size="sm" className="text-white" />
          </div>
          <div className="w-8 h-8 bg-green-500 border border-black mac-shadow flex items-center justify-center">
            <RetroIcon type="terminal" size="sm" className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}