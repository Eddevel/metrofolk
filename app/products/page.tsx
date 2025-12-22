// app/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getCountFromServer, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AnimatedCategoryGrid  from "@/components/AnimatedCategoryGrid";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Package2 } from "lucide-react";


interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category?: string;
  brand?: string;
  tags?: string[];
  [key: string]: any;
}

interface Category {
  slug: string;
  title: string;
  iconName: string;
  color: string;
  bg: string;
  description: string;
  count: string;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Load real-time category counts
  useEffect(() => {
    const baseCategories: Category[] = [
      { slug: "low-voltage-panels", title: "Low Voltage Panels", iconName: "shield", color: "text-blue-600", bg: "bg-blue-50", description: "Complete LV panels, MCC, ATS", count: "Loading..." },
      { slug: "medium-voltage-switchboard", title: "Medium Voltage Switchgear", iconName: "zap", color: "text-orange-600", bg: "bg-orange-50", description: "11kV & 33kV switchgear, RMU", count: "Loading..." },
      { slug: "busbar-cable-management", title: "Busbar & Cable Management", iconName: "wrench", color: "text-purple-600", bg: "bg-purple-50", description: "Copper busbars, trunking", count: "Loading..." },
      { slug: "loose-components-retail", title: "Loose Electrical Components", iconName: "home", color: "text-green-600", bg: "bg-green-50", description: "MCBs, cables, sockets", count: "Loading..." },
      { slug: "green-energy", title: "Green Energy Solutions", iconName: "sun", color: "text-yellow-600", bg: "bg-yellow-50", description: "Solar panels, inverters", count: "Loading..." },
      { slug: "packaged-equipment", title: "Packaged Equipment", iconName: "battery", color: "text-red-600", bg: "bg-red-50", description: "Generators, UPS, pumps", count: "Loading..." },
    ];

    const fetchCounts = async () => {
      const updated = await Promise.all(
        baseCategories.map(async (cat) => {
          try {
            const q = query(collection(db, "products"), where("category", "==", cat.slug));
            const snap = await getCountFromServer(q);
            const count = snap.data().count;
            return {
              ...cat,
              count: count === 0 ? "No stock" : `${count} product${count > 1 ? "s" : ""}`,
            };
          } catch {
            return { ...cat, count: "Error" };
          }
        })
      );
      setCategories(updated);
    };

    fetchCounts();
  }, []);

  // Real-time search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      setHasSearched(true);

      try {
        const q = query(collection(db, "products"), orderBy("name"), limit(100));
        const snap = await getDocs(q);
        const allProducts: Product[] = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Product));

        const filtered = allProducts.filter(product => {
          const query = searchQuery.toLowerCase();
          return (
            product.name?.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query) ||
            (Array.isArray(product.tags) && product.tags.some(tag => 
              typeof tag === "string" && tag.toLowerCase().includes(query)
            ))
          );
        });

        setSearchResults(filtered);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-secondary py-10">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0">
          <Image src="/images/2.svg" loading="eager" alt="Metrofolk" fill className=" opacity-30" priority />
        </div>

        <div className="relative container mx-auto px-5 text-center text-white">
          <Badge className="mb-4 ">Search & Shop</Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Power Solution
          </h1>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 mb-10">
            Search 300+ products solar, panels, cables, generators, and more
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-white/70" />
            <Input
              type="text"
              placeholder="Search by name, brand, or category (e.g. Schneider, inverter, solar)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-6 py-8 text-lg bg-white/10 border-white/30 text-white placeholder:text-white/60 backdrop-blur-lg focus:bg-white/20 transition-all"
            />
            {searching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEARCH RESULTS */}
      {hasSearched && (
        <section className="py-10 bg-background/95">
          <div className="container mx-auto px-5">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                {searchQuery && `Results for "${searchQuery}"`}
              </h2>
              <p className="text-muted-foreground">
                {searching ? "Searching..." : searchResults.length === 0 ? "No products found" : `${searchResults.length} product${searchResults.length > 1 ? "s" : ""} found`}
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : !searching && searchQuery && (
              <div className="text-center py-20">
                <Package2 className="w-20 h-20 mx-auto mb-6 text-muted-foreground/50" />
                <p className="text-xl text-muted-foreground">No products found.</p>
                <p className="text-muted-foreground mt-2">Try "inverter", "Schneider", "solar panel", or "ABB"</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CATEGORIES — only show when not searching */}
      {!hasSearched && (
        <section className="py-10 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-5">
            <div className="text-center ">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Browse by Category
              </h2>
              <p className="text-xl text-muted-foreground">
                Live inventory updated in real time
              </p>
            </div>

            <AnimatedCategoryGrid categories={categories} />
          </div>
        </section>
      )}
    </>
  );
}