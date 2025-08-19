import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { LargeTextToggle } from '@/components/large-text-toggle'
import { Navigation } from '@/components/navigation'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hands of St. Luke Pantry - Volunteer Sign Ups',
  description: 'Volunteer scheduling and food delivery management for Hands of St. Luke Pantry',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <LargeTextToggle />
            <Navigation />
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
