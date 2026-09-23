import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MobileBottomBar, WhatsAppFloat } from '../components/FloatingBars';
import { ScrollToTop } from '../components/ScrollToTop';
import { business } from '../data/site';
import { themeInitScript } from '../lib/theme';
import './globals.css';

// TODO: once the site has a real domain (custom domain or the vercel.app URL),
// update this — it feeds canonical links, sitemap.xml and Open Graph tags.
const SITE_URL = 'https://apj-website.vercel.app';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

const title = 'Battery Shop in Chennai | Inverter & Solar — Anbu Power Junction';
const description =
  'Battery, inverter and solar solutions in Neelankarai, Chennai. Car, bike, inverter, tubular and solar batteries with installation, service and repair across Tamil Nadu.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s — ${business.brandMark}`,
  },
  description,
  keywords: [
    'battery shop Chennai',
    'car battery Chennai',
    'inverter battery Chennai',
    'solar installation Chennai',
    'battery dealer Neelankarai',
    'Anbu Power Junction',
  ],
  authors: [{ name: business.legalName }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: business.legalName,
    title,
    description,
    images: [{ url: '/hero-power.jpg', width: 1600, height: 1200, alt: 'Battery, inverter and solar products from APJ' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/hero-power.jpg'],
  },
  icons: {
    icon: '/logo-mark.webp',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: business.legalName,
    alternateName: business.brandMark,
    image: `${SITE_URL}/hero-power.jpg`,
    url: SITE_URL,
    telephone: business.primaryPhone,
    email: business.email,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${business.address.line1}, ${business.address.line2}`,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: 'IN',
    },
    areaServed: business.serviceArea,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
    openingHoursSpecification: business.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.hours === 'Closed' ? undefined : h.hours.split('–')[0].trim(),
      closes: h.hours === 'Closed' ? undefined : h.hours.split('–')[1]?.trim(),
    })),
    sameAs: [business.mapsUrl, business.socials.instagram, business.socials.facebook],
  };

  return (
    // suppressHydrationWarning: the inline script below sets data-theme on <html> before React hydrates.
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-full flex-col pb-14 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <ScrollToTop />
        <MobileBottomBar />
      </body>
    </html>
  );
}
