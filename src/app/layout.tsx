import type { Metadata } from "next";
import { Geist, Geist_Mono, Tangerine } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const tangerine = Tangerine({
  weight: ["400", "700"],
  variable: "--font-tangerine",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laremise-montmaur.fr';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gîte La Remise | Location de vacances à Montmaur, Hautes-Alpes",
    template: "%s | Gîte La Remise",
  },
  description: "Séjournez au gîte La Remise à Montmaur (05400) au pied du Dévoluy. Grange rénovée de 120m² pour 6 personnes, ferme laitière, rando et ski. Réservez votre séjour !",
  keywords: ["gîte", "montmaur", "hautes-alpes", "location vacances", "montagne", "pic de bure", "ferme laitière", "dévoluy", "gîte 6 personnes", "location saisonnière Hautes-Alpes"],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Gîte La Remise | Location de vacances à Montmaur (Hautes-Alpes)",
    description: "Venez vous ressourcer au gîte La Remise à Montmaur au pied du Dévoluy. Ancienne grange rénovée de 120m², 3 chambres, ferme laitière et grand calme.",
    url: siteUrl,
    siteName: "Gîte La Remise",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gîte La Remise | Location de vacances à Montmaur",
    description: "Ancienne grange rénovée de 120m² pour 6 personnes au pied du Dévoluy à Montmaur (Hautes-Alpes).",
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
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Gîte La Remise',
  alternateName: 'La Remise Montmaur',
  description: 'Gîte rural et maison de vacances de 120m² dans une ancienne grange rénovée au pied du Dévoluy à Montmaur (05400). 3 chambres pour 6 personnes, jardin clos, borne de recharge électrique et ferme laitière.',
  url: siteUrl,
  telephone: '+33672562464',
  email: 'cindy@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '665 Route du Devoluy',
    addressLocality: 'Montmaur',
    postalCode: '05400',
    addressRegion: 'Hautes-Alpes',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.5714,
    longitude: 5.8736,
  },
  containsPlace: {
    '@type': 'Accommodation',
    name: 'Gîte complet 120m²',
    numberOfRooms: 3,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: 6,
    },
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Borne de recharge électrique', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cuisine équipée', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Jardin clos et terrasse ombragée', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Barbecue', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Chauffage au sol', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Wifi gratuit', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Proche pistes de ski Dévoluy (15 min)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Ferme laitière sur place', value: true },
  ],
  priceRange: '€€',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${tangerine.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
