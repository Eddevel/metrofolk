// DELETE THIS ENTIRE FILE OR REPLACE WITH THIS (NO PAYSTACK POPUP)
"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { toast } from "sonner";

export default function ProductModal({ product, onClose }: { product: any; onClose: () => void }) {
  const { addToCart } = useCart();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-4xl text-muted-foreground/30">Image</div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-4xl font-black text-[#4ca626] mt-4">₦{product.price.toLocaleString()}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description || "Premium quality product from Metrofolk."}
            </p>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-[#4ca626]"
                onClick={() => {
                  addToCart(product.id, 1);
                  toast.success("Added to cart!");
                  onClose();
                }}
              >
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="default"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  addToCart(product.id, 1);
                  toast.success("Added to cart! Go to cart to checkout.");
                  onClose();
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </motion.div>

        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
}