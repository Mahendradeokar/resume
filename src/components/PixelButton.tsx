"use client";

import { ReactNode } from "react";

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export default function PixelButton({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "md",
  className = "",
  disabled = false
}: PixelButtonProps) {
  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white border-blue-700",
    secondary: "bg-gray-300 hover:bg-gray-400 text-black border-gray-500", 
    danger: "bg-red-500 hover:bg-red-600 text-white border-red-700"
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        font-mono font-bold uppercase tracking-wider
        border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
        transform transition-all duration-100
        hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)]
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}