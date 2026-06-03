"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Card } from "@/components/Card";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!isLogin && password.length < 6) {
      setErrorMessage("Use a password with at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const authResponse = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (authResponse.error) {
        setErrorMessage(
          isLogin
            ? "We couldn't log you in with those details."
            : "We couldn't create that account. Try a different email or password.",
        );
        return;
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    } finally {
      setIsSubmitting(false);
    }

    router.push("/today");
    router.refresh();
  }

  return (
    <Card>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold leading-8 text-foreground">
          {isLogin ? "Log in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-secondary">
          {isLogin
            ? "Return to Max's daily care rhythm."
            : "Start a calm care space for Max."}
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Email
          <input
            autoComplete="email"
            className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-foreground"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Password
          <input
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-foreground"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {errorMessage ? (
          <p className="rounded-xl bg-background p-3 text-sm leading-6 text-secondary">
            {errorMessage}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center rounded-xl bg-foreground px-4 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? "Working..."
            : isLogin
              ? "Log in"
              : "Create account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm leading-6 text-secondary">
        {isLogin ? "New to CarePaw OS?" : "Already have an account?"}{" "}
        <Link
          className="font-semibold text-foreground"
          href={isLogin ? "/signup" : "/login"}
        >
          {isLogin ? "Create an account" : "Log in"}
        </Link>
      </p>
    </Card>
  );
}
