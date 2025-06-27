"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

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

  useEffect(() => {
    if (!resume) setError(true);
    else posthog.capture("resume_viewed", { slug });
  }, [resume, slug]);

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className="flex w-full flex-col items-center">
        <div className="mb-4 flex w-full justify-between gap-2">
          <button onClick={handleShare} className="px-4 py-2 text-sm">
            Share
          </button>
          <button
            onClick={handleDownload}
            className="rounded px-4 py-2 text-sm"
          >
            Download
          </button>
        </div>
        <div className="flex w-full items-center justify-center overflow-auto rounded shadow">
          <PDFViewer file={resume.path} />
        </div>
      </div>
    </main>
  );
}
