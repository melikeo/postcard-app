import BackHome from "../components/BackHome";
import PostcardPreview from "../components/PostcardPreview";
import { pdf } from "@react-pdf/renderer";
import PostcardPDF from "../components/PostcardPDF";
import { usePostcardStore } from "../stores/postcardStore";

type PreviewPageProps = {
  onBack: () => void;
};

export default function PreviewPage({ onBack }: PreviewPageProps) {
  const {
    uploadedImage,
    message,
    recipientName,
    recipientCountry
  } = usePostcardStore();

  const handleDownload = async () => {
    const blob = await pdf(
      <PostcardPDF
        image={uploadedImage || ''}
        message={message}
        recipientName={recipientName}
        recipientCountry={recipientCountry?.label || ''}
      />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'postcard.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-6 sm:px-8">
      <BackHome onClick={onBack} />

      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-2 mt-15 leading-tight">
        N°5
      </h1>
      <h2 className="font-playfair-display text-primary text-3xl font-style: italic mb-5">Preview</h2>

      <PostcardPreview />

      <button
        className="font-square-peg text-5xl mt-4 focus:outline-none cursor-pointer"
        onClick={handleDownload}>Send {' >'}</button>
    </section>
  );
}