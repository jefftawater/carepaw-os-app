type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-xl border border-border bg-card p-4 shadow-sm shadow-black/[0.02] ${className}`}
    >
      {children}
    </section>
  );
}
