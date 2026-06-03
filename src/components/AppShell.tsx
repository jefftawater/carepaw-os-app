import { BottomNav } from "./BottomNav";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
};

export function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
        <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 pb-3 pt-5 backdrop-blur">
          <h1 className="text-[22px] font-semibold leading-8 text-foreground">
            {title}
          </h1>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-4 py-4 pb-28">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
