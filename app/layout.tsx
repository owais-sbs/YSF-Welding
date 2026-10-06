import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
  return <html lang="en"><body className={inter.className}>{children}</body></html>;
}
