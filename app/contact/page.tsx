// app/contact/page.tsx
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/forms/ContactForm";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero */}
    <section className="relative overflow-hidden bg-gradient-to-r from-secondary  py-10">
    <div className="absolute inset-0 bg-black/80" />
    <div className="absolute inset-0">
    <Image
    src="/images/2.svg"
    loading="eager"
    alt="Metrofolk contact"
    fill
    className=" opacity-30"
    priority
    />
    </div>
    <div className="relative container mx-auto px-5 text-center text-white">
    <Badge className="mb-4">Contact</Badge>
    <h1 className="text-5xl md:text-6xl font-bold mb-6">
    Get In Touch With Metrofolk
    </h1>

    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
    Ready to go solar? Have a question? Our team is here 24/7 to help power your home or business 
    with clean, reliable energy across Nigeria.
    </p>
    </div>
    </section>
<div className="p-10">
        <ContactForm />
        </div>
    </div>
  );
}