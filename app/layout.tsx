import type { Metadata } from "next";
import { League_Spartan, Inter } from "next/font/google";
import "./globals.css";

const spartan = League_Spartan({
  subsets: ["latin", "latin-ext"],
  variable: "--font-spartan",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ziarno na miarę | Świadome pieczenie domowe",
  description: "Baza wiedzy o mąkach, fermentacji i prostych kalkulatorach do domowych wypieków.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${spartan.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <main className="max-w-md mx-auto px-4 py-6 sm:max-w-xl">
          {children}
        </main>
      </body>
    </html>
  );
}