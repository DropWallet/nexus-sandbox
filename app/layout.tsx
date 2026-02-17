import type { Metadata } from 'next'
import { ThemeProvider } from '@/lib/theme/provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design System Boilerplate',
  description: 'A boilerplate for projects using Figma design tokens with Tailwind CSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
