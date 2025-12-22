// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero/Hero";
import About from "@/components/About";
import SolarPackages from "@/components/packages/SolarPackages";
import ServicesPreview from "@/components/ServicesPreview";
import Testimonials from "@/components/Testimonials";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Kill all previous ScrollTriggers on navigation
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
            // Optional: refresh on resize/navigation
            invalidateOnRefresh: true,
          },
        }
      );
    });

    // Force refresh ScrollTrigger on navigation
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMounted]);

  // PREVENT FLASH OF BLANK PAGE
  if (!isMounted) {
    return (
      <main className="min-h-screen">
        <Hero />
        <About />
        <SolarPackages />
        <ServicesPreview />
        <Testimonials />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Hero />
      <About  />
      <SolarPackages />
      <ServicesPreview />
      <Testimonials />
    </main>
  );
}