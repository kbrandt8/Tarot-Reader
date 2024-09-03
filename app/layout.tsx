import type { Metadata } from 'next'
import './css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '@/components/nav';
import Footer from '@/components/footer';
import NextAuthProvider from './context/NextAuthProvider';
import { Suspense } from 'react';
import Loading from '@/components/loading';

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
        <NextAuthProvider>
          <NavBar />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </NextAuthProvider>

      </body>

    </html>
  )
}
