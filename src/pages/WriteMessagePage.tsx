import BackHome from "../components/BackHome";
import NextButton from "../components/NextButton";
import { usePostcardStore } from "../stores/postcardStore";

type WriteMessagePageProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function WriteMessagePage({ onNext, onBack }: WriteMessagePageProps) {
  const message = usePostcardStore(state => state.message);
  const setMessage = usePostcardStore(state => state.setMessage);
  const textCount = usePostcardStore(state => state.textCount);
  const setTextCount = usePostcardStore(state => state.setTextCount);

  const MAX_LENGTH = 200;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_LENGTH) {
      setMessage(newText);
      setTextCount(newText.length);
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-6 sm:px-8">
      <BackHome onClick={onBack} />

      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-2 leading-tight mt-15">
        N°2
      </h1>
      <h2 className="font-playfair-display text-primary text-3xl font-style: italic mb-5">Write your message</h2>

      <textarea
        id="postcard-message"
        rows={4}
        value={message}
        onChange={handleChange}
        maxLength={MAX_LENGTH}
        placeholder="Write your message here..."
        className="font-square-peg text-4xl w-full max-w-md p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary mb-5"
      />

      <div className="text-count">
        {textCount}/{MAX_LENGTH}
      </div>

      <NextButton onClick={onNext} />

    </section>
  );
}