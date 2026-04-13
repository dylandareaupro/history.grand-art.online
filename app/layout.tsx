import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grand Art — Galerie',
  description: 'Exploration de la peinture ancienne',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
