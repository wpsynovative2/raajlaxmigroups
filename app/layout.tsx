import type { Metadata, Viewport } from "next";
import { Jost, Marcellus } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import PageLoader from "@/components/loading/PageLoader";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    images: ["/images/og/raajlaxmi-og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1a33",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${jost.variable} ${marcellus.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available before first paint so scroll-reveal never hides content for no-JS visitors */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <GoogleTagManager gtmId={site.gtmId} />
      <body className="min-h-dvh">
        <PageLoader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
