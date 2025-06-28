"use client";

import { useState, useEffect } from "react";
import posthog from "posthog-js";
import RetroMacWindow from "~/components/RetroMacWindow";
import TerminalSection from "~/components/TerminalSection";
import PixelButton from "~/components/PixelButton";
import RetroProgressBar from "~/components/RetroProgressBar";
import RetroIcon from "~/components/RetroIcon";
import { mahendraResumeData } from "~/data/mahendra-resume";
import type { ResumeData } from "~/types/resume";

interface ResumeInfo {
  title: string;
  path: string;
}

type ClientResumePageProps = {
  resume: ResumeInfo | undefined;
  slug: string;
};

export default function ClientResumePage({
  resume,
  slug,
}: ClientResumePageProps) {
  const [error, setError] = useState(false);
  const [activeWindow, setActiveWindow] = useState("main");
  const [isBooting, setIsBooting] = useState(true);
  const [bootMessage, setBootMessage] = useState("");

  const bootMessages = [
    "System 1.0 Loading...",
    "MacPaint 1.0 Ready",
    "MacWrite 1.0 Ready", 
    "Resume.app Starting...",
    "Welcome to Mahendra's Resume"
  ];

  useEffect(() => {
    if (!resume && slug !== "mahendra-devkar") {
      setError(true);
      return;
    }

    // Boot sequence
    let messageIndex = 0;
    const bootInterval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setBootMessage(bootMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => setIsBooting(false), 1000);
      }
    }, 800);

    posthog.capture("retro_resume_viewed", { slug });

    return () => clearInterval(bootInterval);
  }, [resume, slug]);

  const handleDownloadPDF = () => {
    posthog.capture("retro_resume_downloaded", { slug });
    // Create a simple PDF version or redirect to original
    window.open("/Mahendra_Devkar_Resume.pdf", "_blank");
  };

  const handleShare = async () => {
    posthog.capture("retro_resume_shared", { slug });
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: "Mahendra Devkar - Resume", 
          url,
          text: "Check out Mahendra's retro-style resume!"
        });
      } catch {
        await navigator.clipboard.writeText(url);
        alert("📋 Link copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("📋 Link copied to clipboard!");
    }
  };

  const skills = {
    "JavaScript": 95,
    "TypeScript": 90, 
    "React": 95,
    "Next.js": 90,
    "Node.js": 85,
    "MongoDB": 80,
    "Firebase": 85,
    "Git": 90
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-300 p-4 retro-desktop">
        <RetroMacWindow title="Error" isActive={true}>
          <div className="text-center">
            <RetroIcon type="terminal" size="lg" className="mx-auto mb-4" />
            <p className="font-mono text-sm mb-4">Resume not found.</p>
            <PixelButton onClick={() => window.history.back()}>
              Go Back
            </PixelButton>
          </div>
        </RetroMacWindow>
      </div>
    );
  }

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-8 pixelated">
            <div className="w-full h-full bg-white border-4 border-gray-400 flex items-center justify-center">
              <div className="w-8 h-8 bg-black"></div>
            </div>
          </div>
          <div className="font-mono text-green-400 text-lg animate-typewriter">
            {bootMessage}
          </div>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-400 animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 animate-pulse" style={{animationDelay: "0.2s"}}></div>
            <div className="w-2 h-2 bg-green-400 animate-pulse" style={{animationDelay: "0.4s"}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 p-2 md:p-4 retro-desktop">
      {/* Menu Bar */}
      <div className="bg-white border-b-2 border-black mb-4 p-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-chicago text-sm font-bold">🍎 Resume System 1.0</div>
          <div className="font-mono text-xs text-gray-600">
            {new Date().toLocaleDateString("en-US", { 
              weekday: "short", 
              month: "short", 
              day: "numeric",
              year: "numeric"
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <PixelButton onClick={handleShare} size="sm">
            <RetroIcon type="share" size="sm" className="mr-1" />
            Share
          </PixelButton>
          <PixelButton onClick={handleDownloadPDF} size="sm" variant="secondary">
            <RetroIcon type="download" size="sm" className="mr-1" />
            PDF
          </PixelButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Personal Info Window */}
          <RetroMacWindow 
            title="Personal Info" 
            isActive={activeWindow === "personal"}
            className="retro-slide-in"
          >
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 border-2 border-black mac-shadow flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {mahendraResumeData.personal.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h1 className="font-chicago text-xl font-bold mb-2">
                {mahendraResumeData.personal.name}
              </h1>
              <p className="font-mono text-sm text-gray-600 mb-4">
                {mahendraResumeData.personal.summary}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-400">
                <RetroIcon type="email" size="sm" />
                <span className="font-mono text-sm">{mahendraResumeData.personal.email}</span>
              </div>
              
              {mahendraResumeData.personal.github && (
                <div className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-400">
                  <RetroIcon type="github" size="sm" />
                  <a 
                    href={mahendraResumeData.personal.github}
                    className="font-mono text-sm text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Profile
                  </a>
                </div>
              )}
              
              {mahendraResumeData.personal.linkedin && (
                <div className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-400">
                  <RetroIcon type="linkedin" size="sm" />
                  <a 
                    href={mahendraResumeData.personal.linkedin}
                    className="font-mono text-sm text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
            </div>
          </RetroMacWindow>

          {/* Skills Window */}
          <RetroMacWindow 
            title="Skills" 
            isActive={activeWindow === "skills"}
            className="retro-fade-in"
          >
            <div className="space-y-3">
              {Object.entries(skills).map(([skill, percentage], index) => (
                <RetroProgressBar
                  key={skill}
                  skill={skill}
                  percentage={percentage}
                  delay={index * 200}
                />
              ))}
            </div>
          </RetroMacWindow>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-4">
          {/* Experience Section */}
          <TerminalSection title="Professional Experience" delay={500}>
            <div className="space-y-6">
              {mahendraResumeData.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-cyan-400 pl-4">
                  <div className="text-yellow-400 font-bold text-sm uppercase tracking-wider">
                    {exp.company}
                  </div>
                  <div className="text-blue-400 font-bold mb-1">
                    {exp.position}
                  </div>
                  <div className="text-gray-400 text-xs mb-2">
                    📅 {exp.duration}
                  </div>
                  {exp.techStack && (
                    <div className="text-magenta-400 text-xs mb-2">
                      🛠️ {exp.techStack}
                    </div>
                  )}
                  <ul className="text-green-300 text-sm space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TerminalSection>

          {/* Projects Section */}
          <TerminalSection title="Fun Projects" delay={1000}>
            <div className="grid gap-4">
              {mahendraResumeData.projects.map((project, index) => (
                <div key={index} className="bg-gray-900 p-4 border border-gray-600">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-yellow-400 font-bold text-lg">
                      {project.name}
                    </div>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          🔗 LIVE
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          📦 CODE
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-green-400 text-sm mb-2">
                    {project.description}
                  </div>
                  
                  <div className="text-gray-300 text-xs mb-3">
                    {project.purpose}
                  </div>
                  
                  <div className="text-xs">
                    {project.techStack.frontend && (
                      <div className="mb-1">
                        <span className="text-blue-400">Frontend:</span>{" "}
                        <span className="text-gray-300">{project.techStack.frontend}</span>
                      </div>
                    )}
                    {project.techStack.backend && (
                      <div>
                        <span className="text-red-400">Backend:</span>{" "}
                        <span className="text-gray-300">{project.techStack.backend}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TerminalSection>

          {/* Education Section */}
          <TerminalSection title="Education" delay={1500}>
            <div className="space-y-4">
              {mahendraResumeData.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-yellow-400 pl-4">
                  <div className="text-cyan-400 font-bold">
                    {edu.institution}
                  </div>
                  <div className="text-green-400 text-sm">
                    {edu.degree}
                  </div>
                  <div className="text-gray-400 text-xs">
                    📅 {edu.duration} {edu.location && `📍 ${edu.location}`}
                  </div>
                </div>
              ))}
            </div>
          </TerminalSection>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="font-mono text-xs text-gray-600 mb-2">
          System Status: ● Online | Memory: 512K | Disk: 400K Free
        </div>
        <div className="font-mono text-xs text-gray-500">
          © 2025 Retro Resume System • Designed with 💚 for nostalgia
        </div>
      </div>
    </div>
  );
}