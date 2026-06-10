import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import AuthProvider from '@/components/layout/AuthProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Interior Architect - Design Your Dream Space',
  description:
    'Transform your space with AI-powered interior design. Generate stunning 3D rooms, get smart budget optimization, and visualize your dream interior in real-time.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
