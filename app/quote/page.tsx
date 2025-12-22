// app/quote/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Zap,
  Sun,
  Home,
  Building2,
  ShieldCheck,
  User,
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  location: z.string().min(3, "Location required"),
  propertyType: z.enum(["home", "business", "other"]),
  currentBill: z.string(),
  appliances: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "home",
      currentBill: "150000",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      await addDoc(collection(db, "quotes"), {
        ...data,
        createdAt: serverTimestamp(),
        status: "new",
        source: "quote-page",
      });

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      console.error("Error saving quote:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-secondary  py-15">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0">
          <Image
            src="/images/2.svg"
            loading="eager"
            alt="Metrofolk Quote"
            fill
            className=" opacity-30"
            priority
          />
        </div>
        <div className="relative container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Get Your Free Solar Quote
            <br />
            <span className="text-[#4ca626]">In Under 60 Seconds</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Join 500+ Nigerians saving 90% on electricity bills
          </p>
        </div>
      </section>

   

      {/* Form */}
      <section className="py-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Tell Us Your Power Needs
                    </h2>
                    <p className="text-muted-foreground mt-3">
                      Fill this form and get your custom solar package today
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Full Name</Label>
                      <div className="relative mt-2">
                        <Input {...register("name")} placeholder="John Doe" className="h-12 pl-10" />
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label>Phone (WhatsApp)</Label>
                      <div className="relative mt-2">
                        <Input {...register("phone")} placeholder="08012345678" className="h-12 pl-10" />
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Email & Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Email</Label>
                      <div className="relative mt-2">
                        <Input type="email" {...register("email")} placeholder="john@example.com" className="h-12 pl-10" />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label>City / Area</Label>
                      <div className="relative mt-2">
                        <Input {...register("location")} placeholder="Lekki, Lagos" className="h-12 pl-10" />
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label>Property Type</Label>
                    <RadioGroup
                      defaultValue="home"
                      onValueChange={(value: "home" | "business" | "other") =>
                        setValue("propertyType", value)
                      }
                    >
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <Label className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                          <Home className="h-12 w-12 mb-3" />
                          <RadioGroupItem value="home" className="sr-only" />
                          <span className="font-semibold">Home</span>
                        </Label>
                        <Label className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                          <Building2 className="h-12 w-12 mb-3" />
                          <RadioGroupItem value="business" className="sr-only" />
                          <span className="font-semibold">Business</span>
                        </Label>
                        <Label className="flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer hover:border-primary [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                          <Zap className="h-12 w-12 mb-3" />
                          <RadioGroupItem value="other" className="sr-only" />
                          <span className="font-semibold">Other</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Current Bill */}
                  <div>
                    <Label>Average Monthly Bill (₦)</Label>
                    <Select onValueChange={(value: string) => setValue("currentBill", value)}>
                      <SelectTrigger className="h-12 mt-2">
                        <SelectValue placeholder="Select your range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50000">Below ₦50,000</SelectItem>
                        <SelectItem value="100000">₦50,000 – ₦100,000</SelectItem>
                        <SelectItem value="150000">₦100,000 – ₦200,000</SelectItem>
                        <SelectItem value="300000">₦200,000 – ₦400,000</SelectItem>
                        <SelectItem value="500000">Above ₦500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Appliances & Message */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label>Key Appliances</Label>
                      <Textarea {...register("appliances")} placeholder="2 ACs, freezer..." className="min-h-32 mt-2" />
                    </div>
                    <div>
                      <Label>Additional Info</Label>
                      <Textarea {...register("message")} placeholder="Roof type, budget..." className="min-h-32 mt-2" />
                    </div>
                  </div>
       {/* Success / Error Alert */}
      <section className="py-5">
        <div className="container mx-auto px-6 max-w-4xl">
          {status === "success" && (
            <Alert className="mb-8 border-green-200 bg-green-50 dark:bg-green-950">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <AlertTitle className="text-green-800 dark:text-green-200">
                Quote Sent Successfully!
              </AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                Thank you! Our solar expert will call you within 30 minutes.
              </AlertDescription>
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="destructive" className="mb-8">
              <XCircle className="h-6 w-6" />
              <AlertTitle>Something went wrong</AlertTitle>
              <AlertDescription>
                Please try again or call us at{" "}
                <Link href="tel:+2347050698372" className="font-bold underline">
                  0705-060-8372
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </section>

                  {/* Submit */}
                  <div className="text-center pt-8 ">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="h-16 px-24 w-70 text-xl font-bold bg-[#4ca626] hover:from-green-700  text-white shadow-2xl"
                    >
                      {isSubmitting ? "Sending Your Request..." : "Get My Free Quote Now"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Why 500+ Nigerians Trust Metrofolk</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <Sun className="h-16 w-16 mx-auto mb-4 text-yellow-700" />
              <h3 className="text-xl font-bold mb-2">2-Year Warranty</h3>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <Zap className="h-16 w-16 mx-auto mb-4 text-orange-700" />
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-purple-700" />
              <h3 className="text-xl font-bold mb-2">Certified Team</h3>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-shadow">
              <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-700" />
              <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}