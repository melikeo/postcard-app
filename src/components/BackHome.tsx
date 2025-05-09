import HomeIcon from '@mui/icons-material/Home';

type BackHomeProps = {
  onClick: () => void;
};

export default function BackHome({ onClick }: BackHomeProps) {
  return (
    <button
      className="absolute top-6 left-6 text-primary text-3xl font-bold focus:outline-none cursor-pointer"
      onClick={onClick}
      aria-label="Back to Start"
      title="Back to Start"
    >
      {/* Home Icon */}      
      <HomeIcon/>
    </button>
  );
}
