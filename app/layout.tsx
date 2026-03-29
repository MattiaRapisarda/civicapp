import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/navigation/bottom-nav"

const inter = Inter({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CivicApp",
  description: "Segnalazioni e cittadinanza attiva",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <main className="pb-24">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}