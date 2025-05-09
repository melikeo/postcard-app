import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import WriteMessagePage from "./pages/WriteMessagePage";
import AboutYouPage from "./pages/SenderPage";
import RecipientPage from "./pages/RecipientPage";
import PreviewPage from "./pages/PreviewPage";

export default function App() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <LandingPage onStart={() => setStep(1)} />}
      {step === 1 && <ImageUploadPage
        onNext={() => setStep(2)}
        onBack={() => setStep(0)} // back to home
      />}
      {step === 2 && <WriteMessagePage
        onNext={() => setStep(3)}
        onBack={() => setStep(0)} // back to home
      />}
      {step === 3 && <AboutYouPage
        onNext={() => setStep(4)}
        onBack={() => setStep(0)} // back to home
      />}
      {step === 4 && <RecipientPage
        onNext={() => setStep(5)}
        onBack={() => setStep(0)} // back to home
      />}
      {step === 5 && <PreviewPage
        onBack={() => setStep(0)} // back to home
      />}
    </>
  );
}
