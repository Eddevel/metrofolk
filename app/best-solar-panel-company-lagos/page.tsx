// app/best-solar-panel-company-lagos/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Phone, MapPin, Award, Users, Zap, Shield, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Solar Panel Company in Lagos 2025 | Metrofolk #1 Rated",
  description: "Top-rated solar installation company in Lagos. 500+ homes powered. Canadian Solar, Jinko, Trina panels. 25-year warranty. Free quote & site survey.",
};

export default function Page() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-10 bg-gradient-to-br from-green-600 via-green-700 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0">
          <Image
            src="/images/abuja-estate.jpg"
            alt="Solar panels on Lagos rooftop"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="relative container mx-auto px-5 text-center">
          <Badge className="mb-6 text-lg px-6 py-2 bg-yellow-500 text-black">#1 Solar Company in Lagos 2025</Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Power Your Home with Clean Solar Energy
            <br />
            <span className="text-yellow-400">Zero Electricity Bill Forever</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto opacity-95">
            Trusted by <strong>500+ homes & businesses</strong> in Lekki, Ikoyi, Victoria Island, Ikeja, Ajah & beyond
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/quote">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xl px-12 py-8 rounded-full shadow-2xl">
                Get FREE Quote in 60 Seconds
              </Button>
            </Link>
            <Link href="tel:+2347050698372">
              <Button size="lg"  className="border-2 border-secondary text-secondary bg-primary font-bold text-xl px-10 py-8 rounded-full">
                <Phone className="mr-3 h-6 w-6" /> Call: 0705 069 8372
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-black">500+</div>
              <p className="text-lg mt-2">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black">25</div>
              <p className="text-lg mt-2">Year Warranty</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black">4.9</div>
              <p className="text-lg mt-2">Google Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE METROFOLK */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Why Lagos Trusts Metrofolk for Solar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don't just install panels  we deliver complete peace of mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Award, title: "Tier-1 Panels Only", desc: "Canadian Solar, Jinko, Trina, Longi — Best in the world" },
              { icon: Shield, title: "25-Year Full Warranty", desc: "Performance + Product + Installation covered" },
              { icon: Users, title: "NEMSA Certified Engineers", desc: "Trained & licensed by Nigerian standards" },
              { icon: Zap, title: "Zero Down Payment Plans", desc: "Pay small-small up to 12 months" },
              { icon: CheckCircle2, title: "Free Site Survey", desc: "We visit your home & design perfect system" },
              { icon: Star, title: "After-Sales Support", desc: "24/7 monitoring & maintenance team" },
            ].map((item, i) => (
              <Card key={i} className="p-8 hover:shadow-xl transition-all border-2 hover:border-green-600">
                <item.icon className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-10 ">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              We Serve All of Lagos
            </h2>
            <p className="text-xl text-gray-600">
              From mainland to island  we bring solar to your doorstep
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {["Lekki", "Ajah", "Ikoyi", "Victoria Island", "Ikeja", "Magodo", "Surulere", "Yaba", "Festac", "Gbagada", "Ogba", "Agege"].map((area) => (
              <div key={area} className="text-center">
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-semibold text-lg">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl font-black mb-12">Trusted by Lagos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center opacity-90">
            <div className="text-2xl font-bold">NEMSA</div>
            <div className="text-2xl font-bold">SON</div>
            <div className="text-2xl font-bold">Canadian Solar®</div>
            <div className="text-2xl font-bold">Jinko Solar®</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Say Goodbye to NEPA Bill Forever
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Join 500+ Lagos families enjoying 24/7 power with zero electricity bill
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/quote">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-black text-2xl px-16 py-8 rounded-full shadow-2xl">
                Get Your Free Quote Now
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-xl">
              <Phone className="h-8 w-8" />
              <span className="font-bold">Call/WhatsApp: 0705 069 8372</span>
            </div>
          </div>

          <p className="mt-10 text-lg opacity-80">
            Limited slots available this month • <strong>Next-day installation possible</strong>
          </p>
        </div>
      </section>
    </>
  );
}