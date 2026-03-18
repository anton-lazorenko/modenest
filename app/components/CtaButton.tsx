"use client";

type CtaButtonProps = {
  onClick?: () => void;
  loading?: boolean;
};

export default function CtaButton({
  onClick,
  loading = false,
}: CtaButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full mt-4 py-3 rounded-lg
                 border border-indigo-600
                 text-indigo-600
                 hover:bg-indigo-600 hover:text-white
                 active:scale-95
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}