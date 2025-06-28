"use client";

import {
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  CommandLineIcon,
  ShareIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/16/solid";

interface RetroIconProps {
  type:
    | "download"
    | "share"
    | "terminal"
    | "left_long_arrow"
    | "right_long_arrow"
    | "sun"
    | "moon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function RetroIcon({
  type,
  size = "md",
  className = "",
}: RetroIconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const iconPaths = {
    download: ArrowDownTrayIcon,
    share: ShareIcon,
    terminal: CommandLineIcon,
    left_long_arrow: ArrowLongLeftIcon,
    right_long_arrow: ArrowLongRightIcon,
    sun: SunIcon,
    moon: MoonIcon,
  };

  const Icons = iconPaths[type] || <></>;
  return <Icons className={`${sizeClasses[size]} ${className} pixelated`} />;
}
