type Props = {
    className?: string;
    text?: string;
};

export const PlaceholderImage = ({ className = "", text = "No Image" }: Props) => {
    return (
        <div 
            className={`w-full aspect-square bg-gray-100 rounded-4xl flex flex-col items-center justify-center text-gray-400 select-none ${className}`}
        >
            {/* Minimalist Shopping / Product Icon */}
            <svg 
                className="w-12 h-12 stroke-[1.2] transition-transform duration-300 group-hover:scale-110" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
            >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z" 
                />
            </svg>
            <span className="text-[11px] font-accent tracking-widest uppercase mt-2 text-gray-400 font-semibold">
                {text}
            </span>
        </div>
    );
};
