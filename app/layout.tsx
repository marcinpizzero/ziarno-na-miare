// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BakeInclusion – Inteligentny Przepiśnik Piekarniczy',
  description:
    'Kalkulator piekarniczy uwzględniający celiakię, FODMAP, insulinooporność i alergie. Dynamiczne dostosowanie hydracji i składników.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  );
}