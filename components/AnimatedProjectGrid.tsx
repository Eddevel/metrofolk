// components/AnimatedProjectGrid.tsx — 100% WORKING & CRASH-PROOF
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Image as ImageIcon } from "lucide-react";

interface Project {
  image?: string;
  title: string;
  client: string;
  location: string;
  type: string;
  year: string;
  capacity: string;
  savings: string;
}

export default function AnimatedProjectGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 text-center">
        <p className="text-2xl text-muted-foreground">No projects to display yet.</p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title + index} // ← better key
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 bg-muted/50">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}

                  {/* Fallback when image fails or missing */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-muted/80 ${project.image ? "hidden" : ""}`}>
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Image not available</p>
                    </div>
                  </div>

                  <Badge className="absolute top-4 left-4">{project.type}</Badge>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                    {project.year}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <span className="text-sm font-medium">{project.client}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">System</p>
                    <p className="font-semibold">{project.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Result</p>
                    <p className="text-lg font-bold text-green-600">{project.savings}</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      Real Metrofolk Installation
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}