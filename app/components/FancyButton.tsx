interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function FancyButton({ onClick, children, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer overflow-hidden border border-amber-100 rounded-full group ${className}`}
    >
      {/* Circle */}
      <span className="absolute left-1/2 bottom-0 w-0 h-0 bg-amber-100 rounded-full 
                       -translate-x-1/2 translate-y-1/2
                       transition-all duration-700 ease-out
                       group-hover:w-[500px] group-hover:h-[500px]" />

      {/* Text */}
      <span className="relative z-10 text-amber-100 text-lg transition-colors duration-300 group-hover:text-amber-700">
        {children}
      </span>
    </button>
  );
}