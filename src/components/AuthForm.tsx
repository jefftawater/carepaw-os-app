"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { Card } from "@/components/Card";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "signup";
};

type AuthError = {
  code?: string;
};

const GENERIC_AUTH_ERROR = "Something went wrong. Please try again.";

function getAuthErrorMessage(error: AuthError, isLogin: boolean) {
  if (error.code === "email_not_confirmed") {
    return "Please check your email to confirm your account, then try logging in again.";
  }

  if (isLogin && error.code === "invalid_credentials") {
    return "We couldn’t log you in with that email and password. Check for typos and try again.";
  }

  if (
    !isLogin &&
    (error.code === "user_already_exists" || error.code === "email_exists")
  ) {
    return "An account may already exist for that email. Try logging in instead.";
  }

  return GENERIC_AUTH_ERROR;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
        setErrorMessage(getAuthErrorMessage(authResponse.error, isLogin));
        return;
      }
    } catch {
      setErrorMessage(GENERIC_AUTH_ERROR);
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
        <BrandMark className="mb-2" />
        <h1 className="text-2xl font-semibold leading-8 text-foreground">
          {isLogin ? "Log in" : "Create account"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-secondary">
          CarePaw OS helps you track what matters today for a dog with changing
          mobility needs.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
          Email
          <input
            autoComplete="email"
            className="h-12 rounded-xl border border-border bg-background px-3 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor={`${mode}-password`}
          >
            Password
          </label>
          <span className="relative">
            <input
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="h-12 w-full rounded-xl border border-border bg-background px-3 pr-16 text-base text-foreground outline-none placeholder:text-muted focus:border-primary"
              id={`${mode}-password`}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type={isPasswordVisible ? "text" : "password"}
              value={password}
            />
            <button
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              type="button"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </button>
          </span>
        </div>

        {errorMessage ? (
          <p className="rounded-xl border border-warning-border bg-warning-background p-3 text-sm leading-6 text-warning-text">
            {errorMessage}
          </p>
        ) : null}

        <button
          className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-card transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
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
          className="font-semibold text-primary"
          href={isLogin ? "/signup" : "/login"}
        >
          {isLogin ? "Create an account" : "Log in"}
        </Link>
      </p>
    </Card>
  );
}
