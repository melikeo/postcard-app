import { pdf } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PostcardPDF from './PostcardPDF';
import { usePostcardStore } from '../stores/postcardStore';

export default function PostcardPreview() {
  const {
    uploadedImage,
    message,
    recipientName,
    recipientCountry
  } = usePostcardStore();

  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // create PDF as Blob for URL
    async function generatePdf() {
      const blob = await pdf(
        <PostcardPDF
          image={uploadedImage || ''}
          message={message}
          recipientName={recipientName}
          recipientCountry={recipientCountry?.label || ''}
        />
      ).toBlob();
      setPdfUrl(URL.createObjectURL(blob));
    }
    generatePdf();
    // Clean up URL on unmount
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
    // eslint-disable-next-line
  }, [uploadedImage, message, recipientName, recipientCountry]);

  return (
    <div>
      {pdfUrl && (
        <div style={{ height: 400, width: 600 }}>
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfUrl} />
          </Worker>
        </div>
      )}
    </div>
  );
}
