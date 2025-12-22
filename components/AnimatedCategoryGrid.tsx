// components/AnimatedCategoryGrid.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Wrench, 
  Home, 
  Sun, 
  Battery 
} from "lucide-react";

// Map string → actual icon component
const iconMap: Record<string, React.FC<any>> = {
  shield: Shield,
  zap: Zap,
  wrench: Wrench,
  home: Home,
  sun: Sun,
  battery: Battery,
};

export default function AnimatedCategoryGrid({ categories }: { categories: any[] }) {
  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const Icon = iconMap[cat.iconName] || Shield; // fallback

            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/products/${cat.slug}`}>
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-primary/30">
                    <CardHeader>
                      <div className={`w-16 h-16 rounded-xl ${cat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-8 h-8 ${cat.color}`} />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {cat.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{cat.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{cat.count}</Badge>
                        <span className="text-primary font-medium group-hover:translate-x-3 transition-transform">
                          View Products
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}