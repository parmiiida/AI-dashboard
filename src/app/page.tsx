import CTAsection from "@/components/landing/CTAsection";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="how-it-works">
          <HowItWorks />
        </div>

        <CTAsection />
      </main>
      <FooterSection />
    </div>
  );
}
