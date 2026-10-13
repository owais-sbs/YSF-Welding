import './globals.css';
import type { Metadata } from 'next';
import { Fira_Sans, Roboto } from 'next/font/google';

const firaSans = Fira_Sans({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YSF Welding | Steel Fabrication & Welding in Sharjah',
  description: 'AL YANUF Steel Fabrication & Welding LLC — precision steel, aluminium and custom metalwork for Sharjah and the UAE.',
  openGraph: {
    title: 'YSF Welding | Built to stand strong',
    description: 'Premium steel and aluminium fabrication in Sharjah, UAE.',
    images: [{ url: 'https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1800' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${firaSans.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
