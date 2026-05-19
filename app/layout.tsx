import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import CustomCursor from '@/components/cursor/CustomCursor';

export const metadata: Metadata = {
  title: 'ARUBA COLL — Luxury Tropical Fashion',
  description: 'Premium, sustainable, and luxurious resort wear inspired by the spirit of Aruba. High-end tropical fashion, lookbooks, and exclusive collections.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oi&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream text-text-primary work-sans-regular antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
