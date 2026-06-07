import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Caveat, Indie_Flower, Poppins, Patrick_Hand } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileDock } from '@/components/layout/MobileDock';
import { BackgroundGradient } from '@/components/layout/BackgroundGradient';
import { NavigationLoader } from '@/components/layout/NavigationLoader';
import { IntroLoader } from '@/components/ui/IntroLoader';
import { GezginKeci } from '@/components/ui/GezginKeci';
import { HammerCursor } from '@/components/layout/HammerCursor';
import { SITE } from '@/lib/constants/site';
import './globals.css';

const display = Fraunces({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal'],
  axes: ['opsz', 'SOFT'],
});

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

/* Doodle gövde fontu — Türkçe karakter tam desteği */
const doodle = Indie_Flower({
  subsets: ['latin'],
  variable: '--font-doodle',
  weight: '400',
  display: 'swap',
});

const hand = Caveat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hand',
  display: 'swap',
  weight: ['500', '600'],
});

const poppins = Poppins({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-poppins',
  weight: ['300', '800'],
  display: 'swap',
});

const patrickHand = Patrick_Hand({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-patrick',
  weight: '400',
  display: 'swap',
});



export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Ankara’nın görünmeyen onarım ağları`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    title: SITE.name,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#fafaf7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable} ${hand.variable} ${doodle.variable} ${poppins.variable} ${patrickHand.variable}`}>
      <body className="paper-vignette pb-16 lg:pb-0">
        {/* İlk giriş yükleme ekranı — 3 sn, oturum başına bir kez */}
        <IntroLoader />
        {/* Sayfa geçiş loader'ı — min 2 sn */}
        <NavigationLoader />
        {/* Akışkan arka plan gradyanı — tüm içeriğin arkasında */}
        <BackgroundGradient />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper-light"
        >
          Ana içeriğe atla
        </a>
        <Header />
        <main id="main" className="relative" style={{ zIndex: 1 }}>{children}</main>
        <Footer />
        <MobileDock />
        {/* Gezgin Keçi maskotu — ekranın önünde serbestçe dolaşır */}
        <GezginKeci />
        {/* Özel Çekiç fare imleci ve tıklama kıvılcım efekti */}
        <HammerCursor />
      </body>
    </html>
  );
}
