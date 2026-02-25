import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/organisms/Navbar";
import { Header } from "@/components/molecules/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban-style ToDo list",
  description:
    " ToDo list dashboard with 4 columns (e.g., Backlog, In Progress, Review, Done).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <Provider>
          <Navbar />
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
