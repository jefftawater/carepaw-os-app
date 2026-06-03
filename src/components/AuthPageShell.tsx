type AuthPageShellProps = {
  children: React.ReactNode;
};

export function AuthPageShell({ children }: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[440px] items-center">
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
