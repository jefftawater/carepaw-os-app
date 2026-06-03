"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/profile", label: "Profile" },
  { href: "/history", label: "History" },
  { href: "/care", label: "Care" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-md grid-cols-4 px-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/care" && pathname.startsWith("/care/"));

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-center text-sm font-medium transition-colors ${
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
