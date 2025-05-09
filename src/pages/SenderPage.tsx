import Select from "react-select";
import { CountryOption, countryOptions } from "../components/CountryList";
import BackHome from "../components/BackHome";
import NextButton from "../components/NextButton";
import { usePostcardStore } from "../stores/postcardStore";

type SenderPageProps = {
  onNext: () => void;
  onBack: () => void;
};

export default function SenderPage({ onNext, onBack }: SenderPageProps) {
  const senderName = usePostcardStore(state => state.senderName);
  const setSenderName = usePostcardStore(state => state.setSenderName);
  const senderCountry = usePostcardStore(state => state.senderCountry);
  const setSenderCountry = usePostcardStore(state => state.setSenderCountry);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-6 sm:px-8">
      <BackHome onClick={onBack} />


      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-2 mt-15 leading-tight">
        N°3
      </h1>
      <h2 className="font-playfair-display text-primary text-3xl font-style: italic mb-1">Sender</h2>
      <h3 className="font-playfair-display text-primary text-2xl font-style: italic mb-5">Tell who the card is from!</h3>

      <div className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="name" className="font-playfair-display block text-lg font-medium text-primary mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="font-square-peg text-3xl w-full rounded-lg bg-gray-50 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Timmy Turner"
          />
        </div>

        <div>
          <label className="font-playfair-display block text-lg font-medium text-primary mb-1">Where are you sending the card from?</label>
          <Select<CountryOption>
            options={countryOptions}
            value={senderCountry}
            onChange={setSenderCountry}
            placeholder="Choose country..."
            className="font-square-peg text-3xl w-full rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
            isSearchable
            styles={{
              control: (base, state) => ({
                ...base,
                cursor: 'text',
                borderColor: state.isFocused ? 'var(--color-primary)' : '#d1d5db',
                boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary)' : 'none',
                '&:hover': {
                  borderColor: 'none',
                },
              }),
            }}
          />
        </div>

      </div>

      <NextButton onClick={onNext} />

    </section>
  );
}