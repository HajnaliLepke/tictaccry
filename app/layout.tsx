import './globals.css'
import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'

const inter = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tic-Tac-Cry',
  description: 'idk',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
