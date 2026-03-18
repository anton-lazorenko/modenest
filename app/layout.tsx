import Header from '../app/components/Header';
import Footer from '../app/components/Footer';

import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'ModeNest',
  description: 'Modern fashion store',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}