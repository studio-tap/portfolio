import { IBM_Plex_Mono, Noto_Sans_JP } from 'next/font/google';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'STUDIO-TAP',
  description: 'Web開発・デザインのポートフォリオサイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
    >
      <head>
        <link
          as="font"
          crossOrigin="anonymous"
          href="/font/PlemolJPConsole_NF/PlemolJPConsoleNF-Icons.woff2"
          rel="preload"
          type="font/woff2"
        />
      </head>
      <body
        className={`${ibmPlexMono.variable} ${notoSansJP.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="flex min-h-screen flex-col bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
