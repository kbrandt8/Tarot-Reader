import type { Metadata } from 'next'
import './css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/nav';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Tarot--Reader',
  description: 'A Next.js App that will read your cards.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Footer />
      </body>

    </html>
  )
}
