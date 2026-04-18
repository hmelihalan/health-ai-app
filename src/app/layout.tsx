import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "HEALTH AI | Co-Creation Platform",
  description: "Connect healthcare professionals and engineers for structured hardware and software innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container" style={{ padding: '2rem 1.5rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
