// components/AnimatedServiceCards.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Sun, Wrench, MessageSquare } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.FC<any>> = {
  sun: Sun,
  wrench: Wrench,
  "message-square": MessageSquare,
};

export default function AnimatedServiceCards({ services }: { services: any[] }) {
  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => {
            const Icon = iconMap[service.iconName] || Sun;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-2xl transition-shadow duration-300 border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-xl ${service.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button  className="w-full flex items-center mt-5" variant={index === 0 ? "default" : "outline"}>
                      <Link href="/quote" className="align-items-center">

                      Get Quote 
                      </Link>
                      <ArrowRight className="" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}