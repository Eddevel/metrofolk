// app/solar-inverter-price-in-nigeria-2025/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Solar Inverter Price in Nigeria 2025 Full List (1kVA to 100kVA)",
  description: "Latest 2025 solar inverter prices in Nigeria. Felicity, Luminous, Must, Mercury, Genus. Free delivery + 2-year warranty.",
};

export default function Page() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b  to-secondary">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Solar Inverter Price in Nigeria <span className="text-green-600">2025</span>
          </h1>
          <p className="text-2xl max-w-5xl mx-auto mb-10">
            Updated prices • Free delivery nationwide • 2-5 years warranty • Pay on delivery available
          </p>
          <Link href="/shop?category=inverters">
            <Button size="lg" className="text-xl px-12 py-8">
              Shop All Inverters Now
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 container mx-auto px-5">
        <h2 className="text-4xl font-black text-center mb-12">Current Prices (December 2025)</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { capacity: "2.5kVA/24V", brand: "Felicity", price: "₦485,000", popular: true },
            { capacity: "3.5kVA/48V", brand: "Luminous Cruze", price: "₦695,000", popular: true },
            { capacity: "5kVA/48V Hybrid", brand: "Felicity", price: "₦780,000", popular: true },
            { capacity: "7.5kVA/96V", brand: "Must", price: "₦1,250,000" },
            { capacity: "10kVA/180V", brand: "Genus", price: "₦1,850,000", popular: true },
            { capacity: "15kVA/360V", brand: "Mercury", price: "₦3,200,000" },
          ].map((item) => (
            <div key={item.capacity} className="border-2 border-gray-200 rounded-2xl p-8 hover:border-green-600 transition-all text-center">
              {item.popular && <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">BESTSELLER</span>}
              <h3 className="text-2xl font-bold mt-4">{item.capacity}</h3>
              <p className="text-lg text-gray-600">{item.brand}</p>
              <p className="text-5xl font-black text-green-600 my-6">{item.price}</p>
              <Link href="/shop?category=inverters" className="block">
                <Button className="w-full text-lg py-6">View & Buy Now</Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl mb-8">Can't find your size?</p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="text-xl px-12">
              Chat with Engineer on WhatsApp
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}