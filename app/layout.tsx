import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Svayneak Soft | AI Architecture, Database Spines & Governed Enterprise Automation",
  description:
    "Models explain. Code decides. Full-company database construction, client-facing AI applications, CRM identity provisioning, and governed agentic harnesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#06060b] text-slate-100 font-sans antialiased selection:bg-purple-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
