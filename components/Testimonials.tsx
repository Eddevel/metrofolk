// components/Testimonials.tsx
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { quote: "Great service! Saved us on energy costs.", author: "Dr. Osas, Lagos" },
  { quote: "Reliable installations, highly recommend.", author: "Mrs. Hassan, Abuja" },
  { quote: "Professional team, quick turnaround.", author: "John Peters, Port Harcourt" },
  { quote: "Best solar company in Nigeria!", author: "Eng. Amina, Kano" },
  { quote: "Transformed our home with solar power.", author: "Chief. Osi, Delta" },
  { quote: "Excellent customer support!", author: "Mr. Bamidele, Ibadan" },
];

export default function Testimonials() {
  return (
    <section className="py-15 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-blue-700/70 bg-clip-text text-transparent">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((test, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-primary/10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
            >
              <CardContent className="pt-8 pb-10 px-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                </div>
                <p className="text-lg italic leading-relaxed text-foreground/90 mb-6">
                  "{test.quote}"
                </p>
                <p className="text-right font-semibold text-primary">
                  {test.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground">
            Join hundreds of happy customers across Nigeria
          </p>
        </div>
      </div>
    </section>
  );
}