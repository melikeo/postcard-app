import BackHome from "../components/BackHome";
import { CountryOption, countryOptions } from "../components/CountryList";
import Select from "react-select";
import NextButton from "../components/NextButton";
import { usePostcardStore } from "../stores/postcardStore";

type RecipientPageProps = {
  onNext: () => void;
  onBack: () => void;
};


export default function RecipientPage({ onNext, onBack }: RecipientPageProps) {
    const recipientName = usePostcardStore(state => state.recipientName);
    const setRecipientName = usePostcardStore(state => state.setRecipientName);
    const recipientEmail = usePostcardStore(state => state.recipientEmail);
    const setRecipientEmail = usePostcardStore(state => state.setRecipientEmail);
    const recipientCountry = usePostcardStore(state => state.recipientCountry);
    const setRecipientCountry = usePostcardStore(state => state.setRecipientCountry);


  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background px-6 sm:px-8">
      <BackHome onClick={onBack} />

      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-2 mt-15 leading-tight">
        N°4
      </h1>
      <h2 className="font-playfair-display text-primary text-3xl font-style: italic mb-1">Recipient</h2>
      <h3 className="font-playfair-display text-primary text-2xl text-center font-style: italic mb-5">Who are you sending the card to?</h3>

      <div className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="name" className="font-playfair-display block text-lg font-medium text-primary mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="font-square-peg text-3xl w-full rounded-lg bg-gray-50 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Jenny Example"
          />
        </div>

        <div>
          <label htmlFor="email" className="font-playfair-display block text-lg font-medium text-primary mb-1">E-Mail Address</label>
          <input
            id="email"
            type="text"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="font-square-peg text-3xl w-full rounded-lg bg-gray-50 border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="jenny.example@mail.com"
          />
        </div>

        <div>
          <label className="font-playfair-display block text-lg font-medium text-primary mb-1">Where is the card heading?</label>
          <Select<CountryOption>
            options={countryOptions}
            value={recipientCountry}
            onChange={setRecipientCountry}
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