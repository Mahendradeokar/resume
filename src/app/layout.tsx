import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { PostHogProvider } from "~/components/PostHogProvider";

export const metadata: Metadata = {
  title: "MD",
  description: "Mahendra Devkar Resume",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
