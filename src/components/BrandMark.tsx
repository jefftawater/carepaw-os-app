type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase leading-4 tracking-[0.28em] text-primary ${className}`}
    >
      CAREPAW OS
    </p>
  );
}
