export default function ToggleSwitch({
    checked,
    onChange,
    id = "flexSwitchCheckDefault",
  }: {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
  }) {
    return (
      <label htmlFor={id} className="flex items-center cursor-pointer select-none">
        <div className="relative inline-block w-10 h-6">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            role="switch"
            className="peer absolute w-full h-full opacity-0 cursor-pointer"
          />
          {/* background */}
          <div className="w-full h-6 rounded-full bg-neutral-700 peer-checked:bg-red-600 transition-colors duration-300" />
          {/* button */}
          <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-4" />
        </div>
      </label>
    );
  }
  