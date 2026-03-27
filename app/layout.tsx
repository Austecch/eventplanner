import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eventora - Plan Your Perfect Event',
  description: 'The ultimate event planning platform with integrated services marketplace and gifting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-gray-800">Eventora</a>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/plan" className="text-gray-600 hover:text-gray-900">Plan Event</a>
                <a href="/vendors" className="text-gray-600 hover:text-gray-900">Vendors</a>
                <a href="/gifts" className="text-gray-600 hover:text-gray-900">Gifts</a>
                <a href="/rentals" className="text-gray-600 hover:text-gray-900">Rentals</a>
                <a href="/ai" className="text-gray-600 hover:text-gray-900">AI Assistant</a>
                <a href="/dashboard" className="btn-primary">Dashboard</a>
                <a href="/admin" className="text-gray-600 hover:text-gray-900">Admin</a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}