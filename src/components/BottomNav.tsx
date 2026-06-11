"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/profile", label: "Dog" },
  { href: "/history", label: "History" },
  { href: "/care", label: "Care" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur">
      <div className="grid h-16 grid-cols-4 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/care" && pathname.startsWith("/care/"));

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-center text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-nav-active" : "text-nav-inactive"
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
