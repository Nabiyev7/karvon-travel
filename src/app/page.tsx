import { About } from '@/components/About';
import { BookingModal } from '@/components/BookingModal';
import { ContactCta } from '@/components/ContactCta';
import { Experiences } from '@/components/Experiences';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Packages } from '@/components/Packages';
import { SearchSection } from '@/components/SearchSection';
import { SiteProvider } from '@/components/SiteProvider';
import { Testimonial } from '@/components/Testimonial';

export default function HomePage() {
  return (
    <SiteProvider>
      <Header />
      <main>
        <Hero />
        <SearchSection />
        <Packages />
        <Experiences />
        <About />
        <Testimonial />
        <ContactCta />
      </main>
      <Footer />
      <BookingModal />
    </SiteProvider>
  );
}
