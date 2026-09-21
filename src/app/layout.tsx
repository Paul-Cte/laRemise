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

export const metadata: Metadata = {
  title: "Gîte La Remise | Location de vacances à Montmaur, Hautes-Alpes",
  description: "Découvrez le gîte La Remise à Montmaur (05400). Un lieu idéal pour vos vacances à la montagne, avec activités de plein air, ferme laitière et randonnées près du Pic de Bure.",
  keywords: ["gîte", "montmaur", "hautes-alpes", "location vacances", "montagne", "pic de bure", "ferme laitière", "dévoluy"],
  openGraph: {
    title: "Gîte La Remise | Location de vacances à Montmaur",
    description: "Venez vous ressourcer au gîte La Remise à Montmaur dans les Hautes-Alpes. Activités nature et dépaysement garanti.",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
