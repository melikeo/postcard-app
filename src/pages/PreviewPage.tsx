import BackHome from "../components/BackHome";
import PostcardPreview from "../components/PostcardPreview";
import { usePostcardStore } from "../stores/postcardStore";

type PreviewPageProps = {
  onBack: () => void;
};

export default function PreviewPage({ onBack }: PreviewPageProps) {
  const {
    pdfUrl
  } = usePostcardStore();

  const handleDownload = () => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'postcard.pdf';
    link.click();
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
        onClick={handleDownload} disabled={!pdfUrl}>Send {' >'}</button>
    </section>
  );
}