import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "VELOCITY - Luxury Automotive Experience",
  description:
    "Experience the pinnacle of automotive excellence with our interactive 3D supercar configurator. Customize, explore, and own the future.",
  keywords: "luxury supercars, automotive configurator, 3D car customization, premium vehicles",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
