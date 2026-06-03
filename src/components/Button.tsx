import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  disabled = false,
  href,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseClassName =
    "flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors";
  const variantClassName =
    variant === "primary"
      ? "bg-foreground text-white hover:bg-gray-800"
      : "border border-border bg-card text-foreground hover:bg-gray-50";
  const disabledClassName = disabled
    ? "cursor-not-allowed opacity-50 hover:bg-foreground"
    : "";
  const className = `${baseClassName} ${variantClassName} ${disabledClassName}`;

  if (href) {
    return (
      <Link
        aria-disabled={disabled}
        className={className}
        href={disabled ? "#" : href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
}
