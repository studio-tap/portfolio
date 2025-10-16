import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const plemolJP = localFont({
  src: [
    {
      path: "../public/fonts/PlemolJP_NF_v3.0.0/PlemolJPConsole_NF/PlemolJPConsoleNF-Regular.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../public/fonts/PlemolJP_NF_v3.0.0/PlemolJPConsole_NF/PlemolJPConsoleNF-Bold.ttf",
      weight: "bold",
      style: "normal",
    },
  ],
  variable: "--font-plemol-jp",
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${plemolJP.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
