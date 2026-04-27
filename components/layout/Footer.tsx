// components/Footer.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  ArrowRight
} from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Shop Now", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-secondary text-primary pt-2 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">

          {/* Brand + CTA */}
          <div className="space-y-2">
            <h2 className="  bg-clip-text text-transparent flex itms-center gap-2">
              <Image src="/images/2.svg" loading="eager" alt="" width={100} height={100} className="h-15 w-auto"/>
              
            </h2>
            <p className="text-primary max-w-xs leading-relaxed">
              Reliable solar energy solutions for Nigerian homes and businesses.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-l to-[#4ca626] hover:from-[#4ca626] hover:to-green-800 text-primary font-bold shadow-xl">
              <Link href="/quote" className="flex items-center gap-2">
                Get Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-[#4ca626] mb-3">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-primary hover:text-[#4ca626] transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="text-[#4ca626] group-hover:translate-x-1 transition-transform">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#4ca626] mb-6">Get in Touch</h3>
            <div className="space-y-4 text-primary">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#4ca626]" />
                <span>0705-069-8372</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#4ca626] " />
                <span>info@metrofolk.ng</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#4ca626] " />
                <span>Lagos • Abuja • Delta</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Facebook, href: "https://facebook.com/metrofolksolarenergy" },
                { Icon: Instagram, href: "https://instagram.com/metrofolksolarenergy" },
                { Icon: Twitter, href: "https://x.com/metrofolkenergy" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-gradient-to-r hover:from-green-600 hover:to-[#4ca626] p-3 rounded-full transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-400 mt-12 pt-8 text-center text-primary text-sm">
          <p>© {new Date().getFullYear()} Metrofolk Ltd. All rights reserved. | powered by <Link href="www.eddea.org">
                      Eddea
                    </Link></p>
        </div>
      </div>
    </footer>
  );
}