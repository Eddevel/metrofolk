// app/services/page.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap, PhoneCall } from "lucide-react";
import AnimatedServiceCards from "@/components/AnimatedServiceCards";
import Image from "next/image";

const services = [
  {
    title: "Solar System Installation Services",
    iconName: "sun",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    features: [
      "Residential & Commercial Installations",
      "Hybrid & Off-Grid Systems",
      "Premium Tier-1 Panels",
      "High-Efficiency Inverters",
      "Lithium Battery Storage",
      "Net Metering & Grid-Tie",
      "Full Design & Engineering"
    ]
  },
  {
    title: "System Maintenance & Support",
    iconName: "wrench",
    color: "text-blue-600",
    bg: "bg-blue-50",
    features: [
      "Annual Maintenance Contracts",
      "Preventive Maintenance",
      "Performance Monitoring",
      "Inverter & Battery Repairs",
      "Panel Cleaning",
      "24/7 Emergency Support",
      "Warranty Management"
    ]
  },
  {
    title: "Consultation & Energy Audit",
    iconName: "message-square",
    color: "text-green-600",
    bg: "bg-green-50",
    features: [
      "Free Site Assessment",
      "Energy Audit & Analysis",
      "ROI & Payback Calculation",
      "Custom Design Proposal",
      "Financing Guidance",
      "Government Rebates Info"
    ]
  }
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-r from-secondary  py-10">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0">
        <Image
        src="/images/2,svg"
        loading="eager"
        alt="Metrofolk Quote"
        fill
        className=" opacity-30"
        priority
        />
        </div>
        <div className="relative container mx-auto px-5 text-center text-white">
        <Badge className="mb-4">Our Services</Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Powering Nigeria with Clean Energy
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
        From consultation to lifetime support — your trusted solar partner.
        </p>
        </div>
        </section>
        </section>

      <AnimatedServiceCards services={services} />

      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 text-orange-700" />
          <h2 className="text-4xl font-bold mb-6">Why Choose Metrofolk?</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {["2+ Years", "500+ Projects", "Nationwide", "24/7 Support"].map((item) => (
              <div key={item} className="space-y-2">
                <div className="text-5xl font-bold text-green-700">Check</div>
                <p className="text-lg">{item}</p>
              </div>
            ))}
          </div>
          <Button size="lg" variant="secondary" className="mt-12">
            <PhoneCall className="mr-2 h-5 w-5" /> +234 705 069 8372
          </Button>
        </div>
      </section>
    </>
  );
}