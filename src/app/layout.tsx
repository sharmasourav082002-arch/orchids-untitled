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
          <Providers>
            <ErrorReporter />
            {children}
            <VisualEditsMessenger />
          </Providers>
        </body>
      </html>
    );
}
