// components/ShopPage.tsx — YOUR ORIGINAL + ONLY SOLD OUT OVERLAY ADDED
"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Zap,
  Flame,
  Search,
  HeadphonesIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  description?: string;
  salesCount?: number;
  category?: string;
  stock?: number;
}

const PRODUCTS_PER_LOAD = 15;

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [topSellers, setTopSellers] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS_PER_LOAD);
  const [selected, setSelected] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { addToCart } = useCart();

  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  useEffect(() => {
    if (!urlCategory || allProducts.length === 0) return;

    const categoryMap: Record<string, string> = {
      inverters: "Inverters",
      inverter: "Inverters",
      "solar-panels": "Solar Panels",
      panels: "Solar Panels",
      solar: "Solar Panels",
      batteries: "Batteries",
      "low-voltage": "low-voltage-panels",
      "medium-voltage": "medium-voltage-switchboard",
      cables: "busbar-cable-management",
      "loose-components": "loose-components-retail",
      "green-energy": "green-energy",
      packaged: "packaged-equipment",
    };

    const normalized = urlCategory.toLowerCase().trim();
    const target = categoryMap[normalized];

    if (target && selectedCategory !== target) {
      setSelectedCategory(target);
      setVisibleCount(PRODUCTS_PER_LOAD);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [urlCategory, allProducts, selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const products = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          salesCount: doc.data().salesCount || 0,
          category: doc.data().category || "Uncategorized",
          stock: doc.data().stock ?? 999,
          description: doc.data().description || "Premium quality product from Metrofolk.",
        } as Product));

        setAllProducts(products);

        const sorted = [...products].sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
        setTopSellers(sorted.slice(0, 5));
      } catch (err) {
        console.error("Failed to load products:", err);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("all");
    allProducts.forEach((p) => p.category && cats.add(p.category));
    return Array.from(cats);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleAdd = (product: Product) => {
    if (product.stock && product.stock > 0) {
      addToCart(product.id, 1);
      localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
      toast.success("Added to cart!");
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  return (
    <>
      {/* HERO - UNCHANGED */}
      <section className="relative py-10 bg-gradient-to-br from-primary via-primary/90 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0">
          <Image
            src="/images/2.svg"
            loading="eager"
            alt="Metrofolk"
            fill
            className=" opacity-30"
            priority
          />
        </div>
        <div className="relative container mx-auto px-5 text-center">
          <Badge className="mb-4">Reliable Buy</Badge>
          <h1 className="text-3xl md:text-6xl font-bold mb-4">Buy Your Future Solution</h1>
          <p className="text-xl md:text-3xl mb-1 max-w-4xl mx-auto">
            Premium Solar Panels • Inverters • LV/MV Switchgear • Cables • Everything Electrical
          </p>
        </div>
      </section>

      {/* TRUST BAR - UNCHANGED */}
      <section className="py-6 bg-muted/50 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div><Truck className="mx-auto h-6 w-6 mb-1 text-blue-500" /><p className="font-bold">Free Delivery</p></div>
            <div><Shield className="mx-auto h-6 w-6 mb-1 text-orange-500" /><p className="font-bold">2-Year Warranty</p></div>
            <div><Zap className="mx-auto h-6 w-6 mb-1 text-red-500" /><p className="font-bold">Pay on Delivery</p></div>
            <div><ShoppingCart className="mx-auto h-6 w-6 mb-1 text-[#4ca626] " /><p className="font-bold">In Stock</p></div>
            <div><Star className="mx-auto h-6 w-6 mb-1 text-yellow-500" /><p className="font-bold">4.9 Rating</p></div>
            <div><HeadphonesIcon className="h-6 w-6 mx-auto mb-1 text-purple-500" /><p className="font-bold">24/7 Support</p></div>
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER - UNCHANGED */}
      <section className="py-6 bg-background sticky top-0 z-40 border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(PRODUCTS_PER_LOAD);
                }}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(PRODUCTS_PER_LOAD);
                  }}
                  className="whitespace-nowrap "
                >
                  {cat === "all" ? "All" : cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOP SELLERS - ONLY ADDED SOLD OUT OVERLAY */}
      {topSellers.length > 0 && searchQuery === "" && selectedCategory === "all" && (
        <section className="py-12 bg-gradient-to-b from-blue-50 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3">
                <Flame className="h-8 w-8 text-[#4ca626] animate-pulse" />
                <h2 className="text-3xl md:text-5xl text-black font-black">Top Selling</h2>
                <Flame className="h-8 w-8 text-[#4ca626] animate-pulse" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {topSellers.map((product, index) => (
                <Card key={product.id} className="cursor-pointer overflow-hidden rounded-2xl shadow-lg" onClick={() => setSelected(product)}>
                  <div className="relative aspect-square">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="bg-muted flex items-center justify-center h-full">
                        <Image src="/images/2.svg" loading="eager" alt="Metrofolk shop" width={120} height={120} className="opacity-20" />
                      </div>
                    )}
                    {/* SOLD OUT OVERLAY */}
                    {product.stock !== undefined && product.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center z-10">
                        <span className="text-red-700 text-2xl  font-bold rotate-[-40deg]">SOLD OUT!!!</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 left-2 bg-red-600">#{index + 1}</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm line-clamp-2 mb-2">{product.name}</h3>
                    <p className="text-xl font-black text-blue-600 mb-3">₦{product.price.toLocaleString()}</p>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-l to-[#4ca626] hover:bg-[#4ca626] text-primary" 
                      disabled={product.stock !== undefined && product.stock <= 0}
                      variant={product.stock !== undefined && product.stock <= 0 ? "secondary" : "default"}
                      onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                    >
                      {product.stock !== undefined && product.stock <= 0 ? "Sold Out" : "Add to cart"}
                      <ShoppingCart/>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAIN PRODUCTS - ONLY ADDED SOLD OUT OVERLAY */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-6">
          {searchQuery || selectedCategory !== "all" ? `${filteredProducts.length} Products Found` : "All Products"}
        </h2>

        {visibleProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No products found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleProducts.map((product) => (
                <Card key={product.id} className="cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all" onClick={() => setSelected(product)}>
                  <div className="relative aspect-square bg-muted">
                    {product.imageUrl ? (
                      <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Image src="/images/2.svg" loading='eager' alt="Metrofolk" width={100} height={100} className="opacity-10" />
                      </div>
                    )}
                    {/* SOLD OUT OVERLAY */}
                    {product.stock !== undefined && product.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10 rounded-xl">
                        <span className="text-red-700 text-4xl font-bold rotate-[-20deg]">SOLD OUT</span>
                      </div>
                    )}
                    {product.category && product.category !== "Uncategorized" && (
                      <Badge className="absolute top-2 bg-orange-500 right-2 text-xs">{product.category}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
                    <p className="text-lg font-bold text-orange-500 mb-3">₦{product.price.toLocaleString()}</p>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-l to-[#4ca626] hover:bg-[#4ca626] text-primary" 
                      disabled={product.stock !== undefined && product.stock <= 0}
                      variant={product.stock !== undefined && product.stock <= 0 ? "secondary" : "default"}
                      onClick={(e) => { e.stopPropagation(); handleAdd(product); }}
                    >
                      {product.stock !== undefined && product.stock <= 0 ? "Sold Out" : "Add to cart"}
                      <ShoppingCartIcon />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="text-center mt-12">
                <Button size="lg" onClick={loadMore} className="px-12 bg-[#4ca626]">
                  Load More ({filteredProducts.length - visibleCount} more)
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* MODAL - ONLY BUTTON UPDATED */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl p-6">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black">{selected.name}</DialogTitle>
                <DialogDescription className="text-base mt-4 leading-relaxed">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  {selected.imageUrl ? (
                    <Image src={selected.imageUrl} alt={selected.name} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Image src="/images/2.svg" loading="eager" alt="Metrofolk" width={200} height={200} className="opacity-10" />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <p className="text-2xl font-black text-primary">
                    ₦{selected.price.toLocaleString()}
                  </p>

                  <Button
                    size="lg"
                    className="w-full h-12 text-xl font-bold bg-[#4ca626] text-white"
                    disabled={selected.stock !== undefined && selected.stock <= 0}
                    onClick={() => {
                      handleAdd(selected);
                      setSelected(null);
                    }}
                  >
                    {selected.stock !== undefined && selected.stock <= 0 ? "Sold Out" : <><ShoppingCart className="mr-3 h-7 w-7" /> Add to Cart</>}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}