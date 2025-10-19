import type { Metadata } from "next";
import { IBM_Plex_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
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
      <body className={`${ibmPlexMono.variable} ${notoSansJP.variable} antialiased`} suppressHydrationWarning>
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
