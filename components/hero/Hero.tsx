// components/hero/Hero.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sun, Zap, Shield, ShoppingBagIcon } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black">
      {/* PURE VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover brightness-100"
      >
        <source src="/videos/mfbg.mp4" type="video/mp4" />
        <source src="/videos/mfbg.webm" type="video/webm" />
        {/* No fallback image */}
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* Floating icons */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <Sun className="floating-icon absolute top-20 left-10 text-yellow-400/30 w-20 h-20" />
        <Zap className="floating-icon absolute top-40 right-20 text-[#4ca626]/40 w-16 h-16" />
        <Shield className="floating-icon absolute bottom-32 left-32 text-green-400/30 w-24 h-24" />
        <Sun className="floating-icon absolute bottom-20 right-10 text-orange-400/30 w-28 h-28" />
      </div>

      {/* YOUR FULL CONTENT — 100% PRESERVED */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-secondary/50 backdrop-blur border border-primary/40 text-primary font-bold text-xs md:text-sm uppercase tracking-wider">
              Nigeria's Trusted Solar Provider
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-4 md:mb-6">
            Power Your Future
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ca626] via-[#4ca626] to-red-600">
              With Solar Energy
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Affordable, reliable solar systems for homes & businesses.
            <br className="hidden sm:block" />
            Say goodbye to darkness forever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="w-full  sm:w-auto h-14 px-8 md:px-12 text-lg md:text-xl font-bold bg-gradient-to-r from to-[#4ca626]  text-white shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/quote">
                Get Free Quote
                <ArrowDown className="ml-3 h-5 w-5 animate-bounce" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 px-8  bg-gradient-to-l from to-[#4ca626] text-lg  font-bold  text-white  transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/shop">
                <ShoppingBagIcon className="ml-3 h-5 w-5 animate-bounce" />
                Buy Products
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-12 text-white/90 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-400">500+</div>
              <div className="text-xs md:text-sm uppercase tracking-wider mt-1">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#4ca626] ">10MW+</div>
              <div className="text-xs md:text-sm uppercase tracking-wider mt-1">Installed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-cyan-400">24/7</div>
              <div className="text-xs md:text-sm uppercase tracking-wider mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 md:h-10 md:w-10 text-white/70" />
      </div>
    </section>
  );
}