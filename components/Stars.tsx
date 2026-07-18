export default function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-amber ${className}`}
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden>
          {rating >= i + 1 ? "★" : rating > i ? "⯪" : "☆"}
        </span>
      ))}
    </span>
  );
}
