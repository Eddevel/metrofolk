// app/about/page.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Award, 
  Target, 
  HeartHandshake,
  ShieldCheck,
  Lightbulb
} from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className=" bg-gradient-to-b from-background to-muted/30">
       {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-r from-secondary  py-10">
              <div className="absolute inset-0 bg-black/80" />
              <div className="absolute inset-0">
                <Image
                  src="/images/2.svg"
                  loading="eager"
                  alt="Metrofolk Quote"
                  fill
                  className="opacity-30"
                  priority
                />
              </div>
              <div className="relative container mx-auto px-5 text-center text-white">
            <Badge className="mb-4">About Us</Badge>
             <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powering a Sustainable Nigeria
            </h1>

                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                  Metrofolk Energy Solutions is Nigeria's leading renewable energy company, 
              dedicated to bringing reliable, clean power to homes and businesses nationwide.
                </p>
              </div>
            </section>

            
        <div className="container px-4 my-9 mx-auto">

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2023, Metrofolk began with a simple mission: to reduce Nigeria's 
                dependence on generators and provide reliable, affordable clean energy to every home 
                and business.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we've grown into one of Nigeria's most trusted solar companies with over 
                500 successful installations across Lagos, Abuja, Delta, Port Harcourt, and beyond.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/mfbuilding.png"
                alt="Metrofolk Team Installation"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-5xl font-bold">500+</p>
                <p className="text-xl">Happy Customers</p>
              </div>
            </div>
          </div>

          <Separator className="my-20" />

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="w-12 h-12 text-red-700 mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To make clean, reliable solar energy accessible and affordable for every Nigerian 
                  household and business, reducing carbon emissions and electricity costs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="w-12 h-12 text-orange-700 mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A Nigeria powered primarily by renewable energy, where no home or business suffers 
                  from power outages, and clean energy is the norm, not the exception.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HeartHandshake className="w-12 h-12 text-purple-700 mb-4" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    Integrity & Transparency
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-600" />
                    Excellence in Service
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Customer-First Approach
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}