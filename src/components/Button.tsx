import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
};

export function Button({
  children,
  disabled = false,
  href,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const baseClassName =
    "flex h-12 w-full items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors";
  const variantClassName =
    variant === "primary"
      ? "bg-primary text-card hover:bg-primary-hover"
      : "border border-secondary-action-border bg-card text-foreground hover:bg-utility-hover";
  const disabledClassName = disabled
    ? variant === "primary"
      ? "cursor-not-allowed opacity-50 hover:bg-primary"
      : "cursor-not-allowed opacity-50 hover:bg-card"
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
    <button className={className} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
