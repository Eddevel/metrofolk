// app/projects/page.tsx
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import AnimatedProjectGrid from "@/components/AnimatedProjectGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const projects = [
  { title: "20kW Off-Grid – Lekki Phase 1", client: "Adebayo Family", location: "Lagos", capacity: "20kW + 48kWh", savings: "100% Generator-Free", year: "2024", image: "/images/lekki-mansion.jpg", type: "Residential" },
  { title: "100kW Grid-Tied –  Asaba", client: "Swiss Hotel", location: "Delta", capacity: "100kW Rooftop", savings: "₦42M in 18 months", year: "2023", image: "/images/first-bank.jpg", type: "Commercial" },
  { title: "30kW Estate System – Wuse II", client: "Sunrise Estate", location: "Abuja", capacity: "30kW Central", savings: "₦2.1M monthly", year: "2024", image: "/images/ph-coldstore.jpg", type: "Residential" },
  { title: "15kW Cold Room – Port Harcourt", client: "Rivers Cold Store", location: "PH", capacity: "15kW Hybrid", savings: "90% Diesel Cut", year: "2023", image: "/images/abuja-estate.jpg", type: "Industrial" },
  { title: "8kW Duplex – Surulere", client: "Dr. Okonkwo", location: "Lagos", capacity: "8kW + 15kWh", savings: "No Light Bill", year: "2024", image: "/images/surulere-home.jpg", type: "Residential" },
  { title: "50kW Hybrid System – Kano", client: "Binta Farms", location: "Kano", capacity: "50kW + 100kWh", savings: "₦18.5M/year", year: "2024", image: "/images/solarpanel.png", type: "Commercial" }

];

export default function Projects() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-secondary  py-10">
          <div className="absolute inset-0 bg-black/80" />
            <div className="absolute inset-0">
            <Image
            src="/images/2.svg"
            loading="eager"
            alt="Metrofolk Quote"
            fill
            className=" opacity-30"
            priority
            />
            </div>
            <div className="relative container mx-auto px-5 text-center text-white">
            <Badge className="mb-4">Our Projects</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Real Installations. Real Results.
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Over 500 solar projects nationwide powering homes, hotels, banks, and cold rooms.
            </p>
          </div>
        </section>
      </section>

      <AnimatedProjectGrid projects={projects} />

      <section className="py-10 bg-primary text-secondary">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-green-700">Be Our Next Success Story</h2>
          <p className="text-xl mb-8">Join 500+ Nigerians enjoying 24/7 clean power</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className=" border-2 border-white bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100" > <Link href="/quote" >Get Free Quote</Link> </Button>
            <Button className="border-2 border-white px-8 py-4 rounded-lg text-black font-bold text-lg bg-white hover:bg-gray-100">Call: +234 803 456 7890</Button>
          </div>
        </div>
      </section>
    </>
  );
}