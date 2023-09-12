import './globals.css'
import type { Metadata, } from 'next'
import { Inter } from 'next/font/google'
import { DarkModeProvider } from '@/context/DarkMode.context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ByteCloud",
  description: "The cloud of ByteTribe",
  icons: {
   
  },
  openGraph: {
    images: [
      'https://pqbnoyezospypjajwdzi.supabase.co/storage/v1/object/public/thinktalk/uploads/9903bd4a-11b0-4753-87c0-2ca8bfb6a6ff'
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={inter.className}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  )
}
