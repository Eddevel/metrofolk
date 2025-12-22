// components/ProductCard.tsx — FINAL FIXED (WORKS WITH CART DRAWER)
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useCart } from "@/components/cart/CartProvider"; // ← THIS ONE
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: any }) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart(); // ← Correct hook

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Save product data for cart display
    localStorage.setItem(`product_${product.id}`, JSON.stringify({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || "",
    }));

    addToCart(product.id, 1); // ← This matches your CartProvider

    toast.success(`${product.name} added to cart!`, {
      icon: <ShoppingCart className="h-4 w-4" />,
    });
  };

  return (
    <>
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
      >
        <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow">
          <CardHeader className="p-0">
            <div className="relative aspect-square bg-muted">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground/30" />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#4ca626] line-clamp-2">{product.name}</h3>
            <p className="text-2xl font-bold text-[#4ca626]">
              ₦<span className="text-primary">{Number(product.price).toLocaleString()}.00</span>
            </p>

            <Button className="w-full bg-[#4ca626]" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {open && <ProductModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}