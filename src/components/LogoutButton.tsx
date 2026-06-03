"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="mt-4 h-11 w-full rounded-xl border border-border bg-card px-4 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isLoggingOut}
      onClick={handleLogout}
      type="button"
    >
      {isLoggingOut ? "Logging out..." : "Log out"}
    </button>
  );
}
