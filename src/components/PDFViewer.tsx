import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={<div className="p-4 text-center">Loading PDF…</div>}
        error={
          <div className="p-4 text-center text-red-500">
            Failed to load PDF.
          </div>
        }
      >
        <Page
          key={`page_${1}`}
          pageNumber={1}
          width={Math.min(800, window.innerWidth - 32)}
        />
      </Document>
    </div>
  );
}
