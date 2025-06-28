"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import posthog from "posthog-js";
import PixelButton from "../../components/PixelButton";
import RetroIcon from "../../components/RetroIcon";
import TerminalSection from "../../components/TerminalSection";
import RetroMacWindow from "../../components/RetroMacWindow";
import VerticalSeparator from "../../components/VerticalSeparator";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!resume) setError(true);
    else {
      // Check if there's a ref query parameter
      const refId = searchParams.get("ref");

      posthog.capture("resume_viewed", {
        slug,
        ...(refId && { referred_from: refId }),
      });

      // Remove the ref parameter from URL
      if (refId) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("ref");
        const newUrl = `${window.location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""}`;
        router.replace(newUrl);
      }
    }
  }, [resume, slug, searchParams, router]);

  if (error || !resume) {
    return (
      <TerminalSection title="Resume Error">Resume not found.</TerminalSection>
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
    posthog.capture("resume_shared", { slug, ref: posthog.get_distinct_id() });
    const url = new URL(window.location.href);
    url.searchParams.set("ref", posthog.get_distinct_id());
    if (navigator.share) {
      try {
        await navigator.share({ title: resume.title, url: url.toString() });
      } catch {
        await navigator.clipboard.writeText(url.toString());
        alert("Link copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(url.toString());
      alert("Link copied to clipboard!");
    }
  };

  return (
    <main className="retro-desktop flex min-h-screen w-full flex-col bg-white">
      <div className="my-3 flex flex-1 items-center justify-center">
        <RetroMacWindow
          title={resume?.title || "Resume Viewer"}
          className="min-w-3xl"
          isActive={true}
        >
          <div className="mx-auto flex max-w-[800px] min-w-[340px] flex-col">
            {/* PDF Viewer */}
            <div className="flex min-h-screen w-full flex-1 items-center justify-center overflow-auto bg-white">
              <PDFViewer
                file={resume.path}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                onNumPagesChange={setNumPages}
              />
            </div>
            {/* Remove Page Navigation Bar from here */}
          </div>
        </RetroMacWindow>
      </div>
      {/* Dock/Taskbar */}
      <div className="sticky right-0 bottom-0 left-0 z-50 mt-auto border-t-2 border-black bg-gray-200 p-2">
        <div className="flex items-center justify-center gap-4">
          <PixelButton
            onClick={handleShare}
            variant="secondary"
            size="sm"
            aria-label="Share resume"
            title="Share resume"
          >
            <RetroIcon type="share" size="sm" className="mr-1" />
          </PixelButton>
          <PixelButton
            onClick={handleDownload}
            variant="secondary"
            size="sm"
            aria-label="Download resume"
            title="Download resume"
          >
            <RetroIcon type="download" size="sm" className="mr-1" />
          </PixelButton>
          {/* Vertical separator */}
          <VerticalSeparator />
          <PixelButton
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            variant="secondary"
            size="sm"
            aria-label="Previous page"
            title="Previous page"
          >
            <RetroIcon type="left_long_arrow" size="sm" className="mr-1" />
          </PixelButton>
          <PixelButton
            onClick={() =>
              setCurrentPage(Math.min(numPages ?? 0, currentPage + 1))
            }
            disabled={!numPages || currentPage >= numPages}
            variant="secondary"
            size="sm"
            aria-label="Next page"
            title="Next page"
          >
            <RetroIcon type="right_long_arrow" size="sm" className="mr-1" />
          </PixelButton>
        </div>
      </div>
    </main>
  );
}
