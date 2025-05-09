import BackHome from "../components/BackHome";
import MyDropzone from "../components/FileDropzone";
import NextButton from "../components/NextButton";
import ToggleSwitch from "../components/ToggleSwitch";
import { usePostcardStore } from "../stores/postcardStore";

type ImageUploadPageProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function ImageUploadPage({ onNext, onBack }: ImageUploadPageProps) {
  
  const isGrayscale = usePostcardStore(state => state.isGrayscale)
  const toggleGrayscale = usePostcardStore(state => state.toggleGrayscale)

  const handleFilesDrop = (files: File[]) => {
    console.log("Uploaded file:", files[0])
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background">
      <BackHome onClick={onBack} />
      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-2 leading-tight">
        N°1
      </h1>
      <h2 className="font-playfair-display text-primary text-3xl font-style: italic mb-5">Upload an Image</h2>

      <MyDropzone onFilesDrop={handleFilesDrop} isGrayscale={isGrayscale}/>

      <div className="flex items-center">
  <ToggleSwitch checked={isGrayscale} onChange={toggleGrayscale} />
  <span className="font-playfair-display text-red-600 text-2xl ml-2">Black / White</span>
</div>
<NextButton onClick={onNext} />

    </section>
  );
}
