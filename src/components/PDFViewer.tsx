import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

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
    <Document
      file={file}
      externalLinkTarget={"_blank"}
      className={"h-full overflow-auto bg-white font-mono text-black"}
      onLoadSuccess={handleLoadSuccess}
      loading={
        <div className="border-2 border-black bg-white p-4 text-center font-mono text-black">
          Loading Resume...
        </div>
      }
      error={
        <div className="border-2 border-black bg-white p-4 text-center font-mono text-black">
          Failed to load Resume.
        </div>
      }
    >
      <Page
        key={`page_${currentPage}`}
        pageNumber={currentPage}
        width={Math.min(800, window.innerWidth - 32)}
      />
    </Document>
  );
}
