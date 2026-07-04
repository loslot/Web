import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "JobZ – Find Remote Jobs",
  description: "Browse thousands of remote jobs from trusted companies around the world.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
