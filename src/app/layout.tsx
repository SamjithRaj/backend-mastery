import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "SysForge — Backend Engineering Mastery",
  description:
    "A personalized, elite-level learning platform for backend engineering, systems programming, and distributed systems mastery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise-bg">
        <Sidebar />
        <main
          className="transition-all duration-300 ease-in-out"
          style={{
            marginLeft: 260,
            minHeight: "100vh",
            padding: "32px 40px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
