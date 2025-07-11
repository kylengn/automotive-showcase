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
  title: {
    default: "VELOCITY - Luxury Automotive Experience | 3D Supercar Configurator",
    template: "%s | VELOCITY Automotive"
  },
  description:
    "Experience the pinnacle of automotive excellence with our interactive 3D supercar configurator. Customize, explore, and own the future of luxury vehicles with cutting-edge technology.",
  keywords: [
    "luxury supercars",
    "automotive configurator",
    "3D car customization",
    "premium vehicles",
    "supercar experience",
    "luxury car configurator",
    "3D automotive visualization",
    "premium car showcase",
    "luxury vehicle customization",
    "automotive technology"
  ].join(", "),
  authors: [{ name: "VELOCITY Automotive" }],
  creator: "VELOCITY Automotive",
  publisher: "VELOCITY Automotive",
  generator: 'Next.js',
  applicationName: "VELOCITY Automotive",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://automotive-showcase.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://automotive-showcase.vercel.app',
    siteName: 'VELOCITY Automotive',
    title: 'VELOCITY - Luxury Automotive Experience | 3D Supercar Configurator',
    description: 'Experience the pinnacle of automotive excellence with our interactive 3D supercar configurator. Customize, explore, and own the future of luxury vehicles.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'VELOCITY Luxury Automotive Experience - 3D Supercar Configurator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VELOCITY - Luxury Automotive Experience | 3D Supercar Configurator',
    description: 'Experience the pinnacle of automotive excellence with our interactive 3D supercar configurator. Customize, explore, and own the future.',
    images: ['/twitter-image.png'],
    creator: '@velocity_auto',
    site: '@velocity_auto',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'automotive',
  classification: 'luxury automotive configurator',
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
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VELOCITY Automotive",
              "url": "https://automotive-showcase.vercel.app",
              "logo": "https://automotive-showcase.vercel.app/placeholder-logo.png",
              "description": "Luxury automotive experience with interactive 3D supercar configurator",
              "foundingDate": "2024",
              "industry": "Automotive",
              "sameAs": [
                "https://twitter.com/velocity_auto",
                "https://facebook.com/velocityautomotive",
                "https://instagram.com/velocity_automotive"
              ]
            })
          }}
        />

        {/* Structured Data for WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "VELOCITY Automotive Configurator",
              "description": "Interactive 3D supercar configurator for luxury vehicles",
              "url": "https://automotive-showcase.vercel.app",
              "applicationCategory": "Automotive",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>{children}</body>
    </html>
  )
}
