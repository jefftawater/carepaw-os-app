type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="px-1 text-xs font-semibold uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}
