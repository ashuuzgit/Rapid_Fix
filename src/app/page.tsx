import Hero from "@/components/Hero";
import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#0A0A0A]">
      <Hero />
      <ScrollyTellingCanvas />
      <Services />
      <Testimonials />
      <Stats />
      <Contact />
    </div>
  );
}
