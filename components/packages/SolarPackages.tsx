// components/packages/SolarPackages.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

const packages = [
  {
    kva: "1.5kVA",
    price: "₦899,999",
    appliances: "Lights, Fans, TV, Laptop, Phone Charging",
    popular: false,
  },
  {
    kva: "3kVA",
    price: "₦1,899,000",
    appliances: "Fridge, Fans, TV, Washing Machine",
    popular: true,
  },
  {
    kva: "5kVA",
    price: "₦4,599,000",
    appliances: "1 Inverter AC, Freezer, Washing Machine, Full Lighting",
    popular: false,
  },
  {
    kva: "10kVA",
    price: "₦7,499,000+",
    appliances: "Whole Home/Business, Heavy Machines, Office Use",
    popular: false,
  },
];

export default function SolarPackages() {
  return (
    <section className="py-10 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent mb-4">
            Ready-to-Go Solar Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete systems with panels, inverter, batteries & installation designed for Nigerian homes
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="relative"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-blue-500 to-green-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
                  MOST POPULAR
                </Badge>
              )}

              <Card className={`h-full overflow-hidden border-2 transition-all duration-500 hover:border-primary hover:shadow-2xl bg-card/95 backdrop-blur ${pkg.popular ? "ring-4 ring-primary/20 shadow-xl" : "shadow-lg"}`}>
                <CardHeader className="text-center bg-gradient-to-b from-primary/10 to-transparent">
                  <div className="text-5xl font-black text-primary mb-2">{pkg.kva}</div>
                  <CardDescription className="text-lg">Complete System</CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground font-medium mb-2">Powers:</p>
                    <p className="text-foreground font-medium">{pkg.appliances}</p>
                  </div>

                  <ul className="space-y-3">
                    {["Free Installation", "2-Year Warranty", "Remote Monitoring App", "24/7 Support"].map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button asChild size="lg" className="w-full h-10 font-semibold bg-[#4ca626]">
                   <Link 
                      href="/shop?category=inverter"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4ca626] to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold  rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      Get This Inverter Package
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}