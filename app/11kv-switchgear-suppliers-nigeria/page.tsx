// app/11kv-switchgear-suppliers-nigeria/page.tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Phone, MapPin, Zap, Shield, Truck, Clock, Award } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "11kV & 33kV Switchgear Suppliers in Nigeria | ABB, Schneider, Siemens",
  description: "Authorized distributors of ABB, Schneider, Siemens, Lucy 11kV & 33kV RMU, VCB, SF6 breakers. Fast delivery to Lagos, Abuja, Port Harcourt, Warri, Kano.",
};

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-10 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0">
          <Image
            src="/images/hoho.jpg"
            alt="11kV Switchgear Panel"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="relative container mx-auto px-5 text-center">
          <Badge className="mb-6 text-lg px-6 py-2 bg-yellow-500 text-black font-bold">
            Authorized Distributor • Nationwide Delivery
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
            Nigerias #1 Supplier of
            <br />
            <span className="text-yellow-400">11kV & 33kV Switchgear</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto opacity-95">
            ABB • Schneider Electric • Siemens • Lucy Electric • Hyundai • Original OEM Parts
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/quote">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xl px-14 py-8 rounded-full shadow-2xl">
                Get Quote in 60 Seconds
              </Button>
            </Link>
            <Link href="tel:+2349012345678">
              <Button size="lg" variant="outline" className="border-2 border-white text-primary font-bold text-xl px-10 py-8 rounded-full">
                <Phone className="mr-3 h-6 w-6" /> Call: 0705 069 8372
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400">500+</div>
              <p className="text-lg mt-2">Projects Delivered</p>
            </div>
            <div className="text-center">
              <Truck className="h-12 w-12 mx-auto mb-3 text-green-400" />
              <p className="text-lg font-bold">Lagos • Abuja • PH • Warri</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-3 text-blue-400" />
              <p className="text-lg font-bold">2-7 Days Delivery</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
              <p className="text-lg font-bold">OEM Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS WE SUPPLY */}
      <section className="py-10">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Trusted Global Brands  Original & Genuine
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center max-w-6xl mx-auto">
            {["ABB", "Schneider Electric", "Siemens", "Lucy Electric", "Hyundai", "Toshiba", "Eaton", "CG Power"].map((brand) => (
              <Card key={brand} className="p-8 bg-white hover:shadow-2xl transition-all border-2 hover:border-blue-600">
                <div className="text-xl font-black text-center text-gray-800">{brand}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* PRICING TABLE - NEW SECTION */}
      <section className="py-20 ">
        <div className="container mx-auto px-5">
          <div className="text-center mb-16">
            <Badge className="mb-4 text-lg px-6 py-2 bg-green-600">Updated: December 2025</Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Current 11kV & 33kV Switchgear Prices in Nigeria
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              All prices are <strong>ex-warehouse Lagos</strong> • VAT exclusive • Subject to quantity & forex rate
            </p>
          </div>

          <div className="max-w-7xl mx-auto overflow-x-auto">
            <Table className="border-2 border-gray-300">
              <TableHeader>
                <TableRow className=" text-primary">
                  <TableHead className="text-white font-black text-lg">Product</TableHead>
                  <TableHead className="text-white font-black text-lg">Brand</TableHead>
                  <TableHead className="text-white font-black text-lg">Specification</TableHead>
                  <TableHead className="text-white font-black text-lg text-right">Price (₦)</TableHead>
                  <TableHead className="text-white font-black text-lg">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className=" font-bold text-lg">
                  <TableCell>11kV RMU (3-Way)</TableCell>
                  <TableCell>ABB SafeRing / Schneider RM6</TableCell>
                  <TableCell>2 Switch + 1 Circuit Breaker</TableCell>
                  <TableCell className="text-right text-green-700">₦48,000,000 – ₦58,000,000</TableCell>
                  <TableCell className="text-green-600">In Stock</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>11kV RMU (4-Way)</TableCell>
                  <TableCell>Lucy Electric Sabre</TableCell>
                  <TableCell>3 Switch + 1 VCB</TableCell>
                  <TableCell className="text-right">₦62,000,000 – ₦72,000,000</TableCell>
                  <TableCell>In Stock</TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell>11kV VCB Panel (Indoor)</TableCell>
                  <TableCell>Siemens 8BK20 / ABB VD4</TableCell>
                  <TableCell>630A – 1250A</TableCell>
                  <TableCell className="text-right">₦28,000,000 – ₦38,000,000</TableCell>
                  <TableCell>In Stock</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>33kV RMU (2-Way)</TableCell>
                  <TableCell>Schneider / Lucy</TableCell>
                  <TableCell>SF6 Insulated</TableCell>
                  <TableCell className="text-right">₦85,000,000 – ₦105,000,000</TableCell>
                  <TableCell className="text-orange-600">Limited Stock</TableCell>
                </TableRow>
                <TableRow className="">
                  <TableCell>11kV Load Break Switch + Fuse</TableCell>
                  <TableCell>Hyundai / CG Power</TableCell>
                  <TableCell>630A with Earth Switch</TableCell>
                  <TableCell className="text-right">₦18,500,000 – ₦22,000,000</TableCell>
                  <TableCell>In Stock</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Auto Recloser 33kV</TableCell>
                  <TableCell>NOJA Power / Siemens</TableCell>
                  <TableCell>Overhead Line Protection</TableCell>
                  <TableCell className="text-right">₦65,000,000 – ₦85,000,000</TableCell>
                  <TableCell className="text-orange-600">Indent Only</TableCell>
                </TableRow>
                <TableRow className=" font-bold text-lg">
                  <TableCell>Complete 11kV Substation Package</TableCell>
                  <TableCell>ABB / Schneider</TableCell>
                  <TableCell>RMU + Transformer + LV Panel</TableCell>
                  <TableCell className="text-right text-green-700">From ₦380,000,000</TableCell>
                  <TableCell>Available</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="mt-8 text-center bg-yellow-100 border-2 border-yellow-600 rounded-xl p-8">
              <p className="text-2xl font-black text-gray-800">
                Want the <span className="text-green-600">BEST PRICE</span> today?
              </p>
              <p className="text-lg mt-4 mb-8">
                Prices change daily due to dollar rate • Get your <strong>exact quote in 5 minutes</strong>
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-black text-xl px-16 py-8 rounded-full">
                  Get Todays Price Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-10 ">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            11kV & 33kV Switchgear We Supply
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { name: "Ring Main Unit (RMU) SF6/Vacuum", specs: "11kV & 33kV • Extensible & Non-extensible" },
              { name: "Vacuum Circuit Breaker (VCB) Panel", specs: "630A - 2500A • Indoor & Outdoor" },
              { name: "Air Insulated Switchgear (AIS)", specs: "Up to 33kV • Metal Clad" },
              { name: "Load Break Switch (LBS)", specs: "With/Without Fuse • Motorized Option" },
              { name: "Auto Recloser & Sectionalizer", specs: "33kV Overhead Lines" },
              { name: "Control & Relay Panels", specs: "Protection • SCADA Ready" },
            ].map((item) => (
              <Card key={item.name} className="p-8 hover:shadow-xl transition-all border-2 hover:border-blue-600">
                <Check className="h-10 w-10 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{item.name}</h3>
                <p className="text-gray-600">{item.specs}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 bg-gradient-to-r from-blue-900 to-black text-white">
        <div className="container mx-auto px-5">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
            Why Industry Leaders Choose Metrofolk
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "100% Original Equipment", desc: "Direct from ABB, Schneider, Siemens factories" },
              { icon: Truck, title: "Stock Available in Lagos", desc: "Most models ready for immediate dispatch" },
              { icon: Zap, title: "Expert Technical Support", desc: "Design, installation & commissioning support" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY COVERAGE */}
      <section className="py-10 ">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-10">
            We Deliver to Every State in Nigeria
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-lg font-semibold max-w-5xl mx-auto text-primary">
            {["Lagos", "Abuja", "Port Harcourt", "Warri", "Kano", "Kaduna", "Enugu", "Benin", "Ibadan", "Onitsha", "Aba", "Jos"].map((city) => (
              <div key={city} className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                {city}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Need 11kV or 33kV Switchgear?
          </h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Get the best price & fastest delivery in Nigeria  Guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/quote">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-black text-2xl px-16 py-9 rounded-full shadow-2xl">
                Request Quote Now
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-2xl">
              <Phone className="h-10 w-10" />
              <span className="font-bold">0705 069 8372</span>
            </div>
          </div>

          <p className="mt-12 text-xl opacity-80">
            <strong>Available 24/7</strong> • Same-day response • Best prices in Nigeria
          </p>
        </div>
      </section>
    </>
  );
}