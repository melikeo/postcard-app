type LandingPageProps = {
  onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-background">
      <h1 className="font-gravitas-one text-primary text-4xl md:text-5xl font-bold text-center mb-12 leading-tight">
        Send some Love<br />with a Postcard
      </h1>
      <button className="font-square-peg text-5xl mt-4 focus:outline-none cursor-pointer" onClick={onStart}> Start{' '}
        <span style={{ display: 'inline-block', transform: 'rotate(90deg)' }}>{'>'}</span>
      </button>
    </section>
  );
}
