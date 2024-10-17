// types
import { ReactNode } from 'react';
import type { Metadata } from 'next';

// styles
import '@/styles/globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'DiceDB Playground',
  description:
    'DiceDB is an in-memory, real-time, and reactive database with Redis and SQL support optimized for modern hardware and building real-time applications.', // Added meaningful description
  icons: {
    icon: 'https://dicedb.io/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
