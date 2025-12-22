// app/products/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AnimatedProductGrid from "@/components/AnimatedProductGrid";
import Image from "next/image";
import { Loader2, Package2 } from "lucide-react";

const categoryTitles: Record<string, string> = {
  "low-voltage-panels": "Low Voltage Panels",
  "medium-voltage-switchboard": "Medium Voltage Switchgear",
  "busbar-cable-management": "Busbar & Cable Management",
  "loose-components-retail": "Loose Electrical Components",
  "green-energy": "Green Energy Solutions",
  "packaged-equipment": "Packaged Equipment",
};

export default function CategoryProducts() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "";
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const title = categoryTitles[slug] || slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "products"), where("category", "==", slug));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <>
      {/* EPIC HERO — NOW IDENTICAL TO /products */}
      <section className="relative overflow-hidden bg-gradient-to-r from-secondary ">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0">
          <Image
            src="/images/2.svg"
            alt="Metrofolk products"
            fill
            className=" opacity-30"
            priority
          />
        </div>

        <div className="relative container mx-auto px-5 text-center text-white py-5">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {title}
          </h1>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 mb-8">
            Premium quality products trusted by engineers and installers across Nigeria.
          </p>

          <div className="text-xl font-bold">
            {loading ? (
              <span className="text-white/70">Loading products...</span>
            ) : (
              <span className="text-white">
                {products.length} {products.length === 1 ? "Product" : "Products"} Available
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-16 h-16 animate-spin text-primary mb-6" />
              <p className="text-xl text-muted-foreground">Loading premium products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-32">
              <div className="bg-muted border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Package2 className="w regarding-16 h-16 text-muted-foreground/50" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Coming Soon</h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're adding new stock to this category daily. Check back soon!
              </p>
            </div>
          ) : (
            <AnimatedProductGrid products={products} />
          )}
        </div>
      </section>
    </>
  );
}