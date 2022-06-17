import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from '../pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
  source: string | File | null;
  isMobile: boolean;
};

export default function PDFViewer({ source, isMobile }: Props) {
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const isLoading = () => <p>Loading Document...</p>;

  return (
    <>
      <Document
        file={source}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={isLoading}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page
            scale={isMobile ? 0.65 : 1}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        ))}
      </Document>
    </>
  );
}
