import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CarePaw OS",
  description: "Daily care support for dogs with reduced mobility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
