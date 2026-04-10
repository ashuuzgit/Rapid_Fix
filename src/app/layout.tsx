import type { Metadata } from 'next';
import { Domine } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsappSticky from '@/components/WhatsappSticky';

const domine = Domine({ subsets: ['latin'], variable: '--font-domine' });

export const metadata: Metadata = {
  title: 'Premium Auto Repair | The Best Service',
  description: 'Expert diagnostics, precision repair, and same-day service — engineered for drivers who won\'t settle.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Domine:wght@400..700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-sans bg-background text-white/65 antialiased relative min-h-screen flex flex-col')}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <WhatsappSticky />
        <Footer />
      </body>
    </html>
  );
}
