import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Aura - Premium Lifestyle Store",
  description: "Discover curated lifestyle products for the modern home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="279758ca-44cc-4421-aba0-dc97d48d5898"
        />
          <Providers>
            <ErrorReporter />
            {children}
            <VisualEditsMessenger />
          </Providers>
        </body>
      </html>
    );
}
