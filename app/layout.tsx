import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIEMS International Conference',
  description: 'Designed by AIEMS ISE Dept.',
  generator: 'Technical club',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
