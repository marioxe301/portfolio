import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mario Flores | Software Engineer",
    template: "%s | Mario Flores",
  },
  description:
    "Retro RPG-inspired portfolio showcasing Mario Flores's experience, skills, projects, and contact details.",
  keywords: [
    "Mario Flores",
    "Software Engineer",
    "Frontend Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
