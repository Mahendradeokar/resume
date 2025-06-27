"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import {
  SunIcon,
  MoonIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";

const PDFViewer = dynamic(() => import("~/components/PDFViewer"), {
  ssr: false,
});

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
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  useEffect(() => {
    if (!resume) setError(true);
    else posthog.capture("resume_viewed", { slug });
  }, [resume, slug]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (error || !resume) {
    return (
      <div className="p-8 text-center text-red-500">Resume not found.</div>
    );
  }

  const handleDownload = () => {
    posthog.capture("resume_downloaded", { slug });
    const link = document.createElement("a");
    link.href = resume.path;
    link.download = resume.title + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    posthog.capture("resume_shared", { slug });
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: resume.title, url });
      } catch {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handleThemeToggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white p-2">
      <div className="flex w-full max-w-4xl flex-col border-2 border-black bg-white">
        {/* Local PDF Header */}
        <div className="flex items-center justify-between border-b-2 border-black bg-white px-4 py-3">
          <h1 className="font-mono text-xl font-bold text-black select-none md:text-2xl">
            {resume.title}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="border-2 border-black bg-gray-200 p-2 font-mono"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-black" />
              ) : (
                <MoonIcon className="h-5 w-5 text-black" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="border-2 border-black bg-gray-200 p-2 font-mono"
              aria-label="Share resume"
            >
              <ShareIcon className="h-5 w-5 text-black" />
            </button>
            <button
              onClick={handleDownload}
              className="border-2 border-black bg-gray-200 p-2 font-mono"
              aria-label="Download resume"
            >
              <ArrowDownTrayIcon className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>
        {/* PDF Viewer */}
        <div className="flex min-h-screen w-full flex-1 items-center justify-center overflow-auto bg-white">
          <PDFViewer
            file={resume.path}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onNumPagesChange={setNumPages}
          />
        </div>
        {/* Page Navigation Bar (bottom right inside PDF card) */}
        {numPages && (
          <div className="flex justify-end gap-3 bg-white p-4">
            <button
              className="border-2 border-black bg-gray-200 px-3 py-1 font-mono text-xs font-medium disabled:opacity-50"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              <ArrowLongLeftIcon className="h-5 w-5 text-black" />
            </button>
            {/* <span className="font-mono text-xs select-none">
              Page {currentPage} / {numPages}
            </span> */}
            <button
              className="border-2 border-black bg-gray-200 px-3 py-1 font-mono text-xs font-medium disabled:opacity-50"
              onClick={() =>
                setCurrentPage(Math.min(numPages, currentPage + 1))
              }
              disabled={currentPage >= numPages}
              aria-label="Next page"
            >
              <ArrowLongRightIcon className="h-5 w-5 text-black" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
