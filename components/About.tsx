// components/about/About.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 2, label: "Years of Excellence", suffix: "+" },
  { value: 500, label: "Projects Delivered", suffix: "+" },
  { value: 100, label: "Happy Clients", suffix: "%" },
];

export default function About() {
  // Correct way: use separate refs for each counter
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((el, index) => {
      if (!el) return;

      const target = stats[index].value;
      const suffix = stats[index].suffix || "";
      let current = 0;

      el.textContent = `0${suffix}`;

      const timer = setInterval(() => {
        current += target / 40;
        if (current >= target) {
          el.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${Math.floor(current)}${suffix}`;
        }
      }, 50);

      return () => clearInterval(timer);
    });
  }, []);

  return (
    <section className="py-15 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-[#4ca626] bg-clip-text text-transparent mb-6">
            About Metrofolk 
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 2023, we are Nigeria's fastest growing solar company delivering clean, reliable power to homes and businesses across the country.
          </p>
        </motion.div>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="text-center"
            >
              <Card className="p-7 hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/60 bg-gradient-to-br from-white to-primary/5 dark:from-gray-900">
                <CardHeader>
                  <CardTitle className="text-8xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-700">
                    {/* This is the correct ref syntax */}
                    <span ref={(el) => { refs.current[i] = el; }}>
                      0{stat.suffix}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-gradient-to-bl from-[#4ca626]/10 to-green/5 border-l-8 border-[#4ca626] shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#4ca626]">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed">
                To make solar energy affordable and accessible to every Nigerian household and business ending the era of darkness and high electricity bills.
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="h-full bg-gradient-to-bl from-blue-700/10  border-l-8 border-blue-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-blue-700">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg leading-relaxed">
                A Nigeria powered entirely by clean energy where no home or business ever goes dark again, and sustainability is the standard.
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}