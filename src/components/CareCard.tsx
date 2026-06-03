import Link from "next/link";

type CareCardProps = {
  description: string;
  href?: string;
  title: string;
};

export function CareCard({ description, href, title }: CareCardProps) {
  const content = (
    <>
      <div>
        <h2 className="text-base font-semibold leading-6 text-foreground">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-secondary">{description}</p>
      </div>
      {href ? <span className="text-lg text-muted">›</span> : null}
    </>
  );

  const className =
    "flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm shadow-black/[0.02]";

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}
