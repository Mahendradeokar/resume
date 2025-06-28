"use client";

interface RetroIconProps {
  type: "email" | "github" | "linkedin" | "download" | "share" | "external" | "folder" | "terminal";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RetroIcon({ type, size = "md", className = "" }: RetroIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const iconPaths = {
    email: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="0" y="2" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M0 2 L8 8 L16 2" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M0 14 L6 8" fill="none" stroke="currentColor" strokeWidth="1"/>
        <path d="M16 14 L10 8" fill="none" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="6" y="0" width="4" height="2" fill="currentColor"/>
        <rect x="4" y="2" width="8" height="2" fill="currentColor"/>
        <rect x="2" y="4" width="12" height="2" fill="currentColor"/>
        <rect x="0" y="6" width="16" height="2" fill="currentColor"/>
        <rect x="2" y="8" width="12" height="2" fill="currentColor"/>
        <rect x="4" y="10" width="8" height="2" fill="currentColor"/>
        <rect x="6" y="12" width="4" height="2" fill="currentColor"/>
        <rect x="2" y="14" width="2" height="2" fill="currentColor"/>
        <rect x="12" y="14" width="2" height="2" fill="currentColor"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="2" y="6" width="2" height="8" fill="currentColor"/>
        <rect x="2" y="2" width="2" height="2" fill="currentColor"/>
        <rect x="6" y="6" width="2" height="8" fill="currentColor"/>
        <rect x="8" y="8" width="2" height="6" fill="currentColor"/>
        <rect x="10" y="10" width="2" height="4" fill="currentColor"/>
        <rect x="12" y="12" width="2" height="2" fill="currentColor"/>
      </svg>
    ),
    download: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="6" y="0" width="4" height="8" fill="currentColor"/>
        <rect x="4" y="6" width="8" height="2" fill="currentColor"/>
        <rect x="2" y="8" width="12" height="2" fill="currentColor"/>
        <rect x="0" y="12" width="16" height="2" fill="currentColor"/>
        <rect x="0" y="14" width="16" height="2" fill="currentColor"/>
      </svg>
    ),
    share: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <circle cx="3" cy="4" r="2" fill="currentColor"/>
        <circle cx="13" cy="4" r="2" fill="currentColor"/>
        <circle cx="8" cy="12" r="2" fill="currentColor"/>
        <line x1="5" y1="5" x2="11" y2="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="5" y1="11" x2="11" y2="5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    external: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="0" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"/>
        <rect x="8" y="0" width="8" height="2" fill="currentColor"/>
        <rect x="14" y="2" width="2" height="6" fill="currentColor"/>
        <rect x="6" y="2" width="2" height="2" fill="currentColor"/>
        <rect x="8" y="4" width="2" height="2" fill="currentColor"/>
        <rect x="10" y="6" width="2" height="2" fill="currentColor"/>
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="0" y="4" width="16" height="10" fill="currentColor"/>
        <rect x="0" y="2" width="6" height="2" fill="currentColor"/>
        <rect x="6" y="0" width="4" height="4" fill="currentColor"/>
        <rect x="1" y="5" width="14" height="8" fill="none" stroke="white" strokeWidth="1"/>
      </svg>
    ),
    terminal: (
      <svg viewBox="0 0 16 16" className={`${sizeClasses[size]} ${className} pixelated`}>
        <rect x="0" y="0" width="16" height="16" fill="currentColor"/>
        <rect x="1" y="1" width="14" height="14" fill="black"/>
        <rect x="2" y="3" width="2" height="2" fill="#00ff00"/>
        <rect x="5" y="3" width="6" height="2" fill="#00ff00"/>
        <rect x="2" y="6" width="8" height="2" fill="#00ff00"/>
        <rect x="2" y="9" width="4" height="2" fill="#00ff00"/>
        <rect x="7" y="9" width="2" height="2" fill="#00ff00"/>
        <rect x="10" y="9" width="2" height="2" fill="#00ff00"/>
      </svg>
    )
  };

  return iconPaths[type] || null;
}