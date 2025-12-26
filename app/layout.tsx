import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: "Pinky's Portfolio | Flappy Bird Game",
  description: 'Interactive Flappy Bird portfolio by Ummey Habiba Pinky - Software Developer',
  generator: 'v0.dev',
  keywords: ['portfolio', 'developer', 'flappy bird', 'game', 'interactive'],
  authors: [{ name: 'Ummey Habiba Pinky' }],
  openGraph: {
    title: "Pinky's Portfolio | Flappy Bird Game",
    description: 'Play through my portfolio! An interactive Flappy Bird-style experience.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts - Press Start 2P for retro pixel style */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
