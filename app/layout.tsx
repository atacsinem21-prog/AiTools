import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Global AI Tools",
  description: "TR/EN AI tools directory",
  verification: {
    google: "3-CdotgYw6E0E6Z9WepzN6iiDgxI0J8nV1bNSey5yRs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-bg text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
