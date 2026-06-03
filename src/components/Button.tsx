import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  href,
  variant = "primary",
}: ButtonProps) {
  const className =
    variant === "primary"
      ? "flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
      : "flex h-12 w-full items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50";

  if (href) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
