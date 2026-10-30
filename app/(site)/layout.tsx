import EnquiryProvider from "@/components/enquiry/EnquiryProvider";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import RevealObserver from "@/components/ui/RevealObserver";
import { site } from "@/lib/site";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <EnquiryProvider>
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <WhatsAppFloat number={site.whatsapp} />
      <RevealObserver />
    </EnquiryProvider>
  );
}
