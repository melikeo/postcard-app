type NextButtonProps = {
    onClick: () => void;
}

export default function NextButton({ onClick }: NextButtonProps) {
    return (
        <button className="font-square-peg text-5xl mt-4 focus:outline-none cursor-pointer" onClick={onClick}> Next{' '}
            <span style={{ display: 'inline-block', transform: 'rotate(90deg)' }}>{'>'}</span>
        </button>

    );
}