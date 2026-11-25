import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Past 21 — Clothing",
  description: "Past 21. A study in quietness, becoming and self-expression."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
