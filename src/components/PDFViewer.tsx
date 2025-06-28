"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import TerminalSection from "./TerminalSection";
import RetroProgressBar from "./RetroProgressBar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PDFViewerProps {
  file: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onNumPagesChange?: (numPages: number) => void;
}

export default function PDFViewer({
  file,
  currentPage,
  setCurrentPage,
  onNumPagesChange,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  useEffect(() => {
    if (numPages && currentPage > numPages) {
      setCurrentPage(numPages);
    }
  }, [numPages, currentPage, setCurrentPage]);

  const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (onNumPagesChange) onNumPagesChange(numPages);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <Document
        file={file}
        className={"h-full overflow-auto bg-white font-mono text-black"}
        onLoadSuccess={handleLoadSuccess}
        loading={
          <div className="flex flex-col items-center justify-center p-8">
            <RetroProgressBar skill="Loading PDF..." percentage={80} />
          </div>
        }
        error={
          <TerminalSection title="PDF Error">
            Failed to load PDF.
          </TerminalSection>
        }
      >
        <Page
          key={`page_${currentPage}`}
          pageNumber={currentPage}
          width={Math.min(
            800,
            typeof window !== "undefined" ? window.innerWidth - 32 : 800,
          )}
        />
      </Document>
    </div>
  );
}
