// components/ServicesPreview.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Wrench, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Sun,
    title: "Solar Panel Installation",
    desc: "Custom-designed solar systems for homes & businesses across Nigeria.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    desc: "Annual servicing, cleaning, and 24/7 emergency support.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Energy Audit & Consultation",
    desc: "Free site survey + detailed load analysis and savings report.",
    color: "from-purple-500 to-pink-500",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-10 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground">
            End-to-end solar solutions tailored for Nigerian homes & businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl bg-card/95 backdrop-blur">
                <CardHeader className="text-center">
                  <div className={`inline-flex p-4 w-18 rounded-full bg-gradient-to-br ${service.color} text-white mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}