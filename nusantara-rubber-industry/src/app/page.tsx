import { HeroSection } from '@/components/hero-section';
import { StorytellingSection } from '@/components/storytelling-section';
import { BrandValuesSection } from '@/components/brand-values-section';
import { AboutSection } from '@/components/about-section';
import { ProductsSection } from '@/components/products-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ExclusiveMembershipCTA } from '@/components/exclusive-membership-cta';
import { NewsletterSection } from '@/components/newsletter-section';
import { ContactSection } from '@/components/contact-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StorytellingSection />
      <BrandValuesSection />
      <AboutSection />
      <ProductsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ExclusiveMembershipCTA />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}