"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import posthog from "posthog-js";
import {
  ArrowDownTrayIcon,
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  EnvelopeIcon,
  CheckIcon,
  LinkIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import ActionButton from "~/components/StateButton";
import { Logo } from "~/components/Logo";

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

const ActionButtonCopyState = () => (
  <>
    <ActionButton.Loading>
      <ClipboardIcon className="h-4 w-4 text-black" />
      <span>Copying</span>
    </ActionButton.Loading>

    <ActionButton.Completed>
      <CheckIcon className="h-4 w-4 text-black" />
      <span>Copied</span>
    </ActionButton.Completed>
  </>
);

export default function ClientResumePage({
  resume,
  slug,
}: ClientResumePageProps) {
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    if (!resume) setError(true);
    else {
      // Check if user came from a referral link
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get("ref");

      if (refParam) {
        posthog.capture("resume_viewed_from_referral", {
          slug,
          referrer_id: refParam,
        });

        // Remove the ref parameter from URL without page reload
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("ref");
        window.history.replaceState({}, "", newUrl.toString());
      } else {
        posthog.capture("resume_viewed", { slug });
      }
    }
  }, [resume, slug]);

  useEffect(() => {
    posthog.capture("page_changed", { page: currentPage });
  }, [currentPage]);

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
    const identityId = posthog.get_distinct_id();
    posthog.capture("resume_shared", { slug, ref: identityId });
    const url = new URL(window.location.href);
    url.searchParams.set("ref", identityId);
    await navigator.clipboard.writeText(url.toString());
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-white p-2">
      <div className="flex w-full max-w-4xl flex-col border-2 border-black bg-white">
        {/* Local PDF Header */}
        <div className="flex items-center justify-between border-b-2 border-black bg-white px-4 py-3">
          <Logo />
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={async () => {
                await navigator.clipboard.writeText(
                  "deokarmahendra424@gmail.com",
                );
              }}
              aria-label="Copy Email"
              className="flex w-28 items-center justify-center gap-1"
              title="Copy Email"
            >
              <ActionButton.Normal>
                <EnvelopeIcon className="h-4 w-4 text-black" />
                <span>Email</span>
              </ActionButton.Normal>
              <ActionButtonCopyState />
            </ActionButton>

            <ActionButton
              onClick={handleShare}
              aria-label="Share resume"
              className="flex w-28 items-center justify-center gap-1"
              title="Share resume"
            >
              <ActionButton.Normal>
                <LinkIcon className="h-4 w-4 rotate-6 text-black" />
                <span>Link</span>
              </ActionButton.Normal>
              <ActionButtonCopyState />
            </ActionButton>

            <ActionButton
              onClick={handleDownload}
              className="flex w-36 items-center justify-center gap-1"
              aria-label="Download resume"
              title="Download resume"
            >
              <ActionButton.Normal>
                <ArrowDownTrayIcon className="h-5 w-5 text-black" />
                <span>Download</span>
              </ActionButton.Normal>
              <ActionButton.Loading>
                <ArrowDownTrayIcon className="h-5 w-5 text-black" />
                <span>Downloading</span>
              </ActionButton.Loading>

              <ActionButton.Completed>
                <CheckIcon className="h-4 w-4 text-black" />
                <span>Downloaded</span>
              </ActionButton.Completed>
            </ActionButton>
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
        <div className="flex justify-end gap-3 bg-white p-4">
          <ActionButton
            className="border-2 border-black bg-gray-200 px-3 py-1 font-mono text-xs font-medium disabled:opacity-50"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            title="Previous page"
          >
            <ArrowLongLeftIcon className="h-5 w-5 text-black" />
          </ActionButton>
          {/* <span className="font-mono text-xs select-none">
              Page {currentPage} / {numPages}
            </span> */}
          <ActionButton
            className="border-2 border-black bg-gray-200 px-3 py-1 font-mono text-xs font-medium disabled:opacity-50"
            onClick={() =>
              setCurrentPage(Math.min(numPages ?? 0, currentPage + 1))
            }
            disabled={!numPages || currentPage >= numPages}
            aria-label="Next page"
            title="Next page"
          >
            <ArrowLongRightIcon className="h-5 w-5 text-black" />
          </ActionButton>
        </div>
      </div>
    </main>
  );
}
