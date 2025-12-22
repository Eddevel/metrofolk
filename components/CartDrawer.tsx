// components/CartDrawer.tsx — FINAL & PERFECT (POPUP WORKS + NO CLICK ISSUES)
"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Loader2, CreditCard, Trash2, Truck, Calendar, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/components/cart/CartProvider";
import { useAuth } from "@/lib/auth";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  onSnapshot,
  doc,
  updateDoc 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, clear, removeFromCart } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasActiveInstallment, setHasActiveInstallment] = useState(false);

  const items = cart.map((item) => {
    const saved = localStorage.getItem(`product_${item.productId}`);
    const product = saved ? JSON.parse(saved) : { name: "Product", price: 0, imageUrl: "" };
    return {
      id: item.productId,
      name: product.name || "Product",
      price: Number(product.price) || 0,
      imageUrl: product.imageUrl || "",
      quantity: item.quantity,
    };
  });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    if (!user || !open) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      where("paymentMethod", "==", "installment")
    );

    const unsub = onSnapshot(q, (snap) => {
      const active = snap.docs.some((doc) => {
        const data = doc.data();
        return (data.installmentPlan?.remainingAmount ?? 0) > 0;
      });
      setHasActiveInstallment(active);
    });

    return () => unsub();
  }, [user, open]);

  const handleCheckout = async (method: "card" | "delivery" | "installment") => {
    if (!user) return toast.error("Please login first");
    if (!address.trim()) return toast.error("Enter delivery address");

    if (method === "installment" && hasActiveInstallment) {
      return toast.error("You already have an active installment plan. Complete it first.");
    }

    setLoading(true);

    try {
      const orderData: any = {
        userId: user.uid,
        userEmail: user.email!,
        shippingAddress: address.trim(),
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount: total,
        paymentMethod: method,
        status: method === "delivery" ? "pending-pod" : method === "installment" ? "pending-approval" : "pending",
        createdAt: serverTimestamp(),
      };

      if (method === "installment") {
        orderData.installmentPlan = {
          totalAmount: total,
          paidAmount: 0,
          remainingAmount: total,
          nextDueDate: null,
          payments: []
        };
      }

      const orderRef = await addDoc(collection(db, "orders"), orderData);

      if (method === "card") {
        // THIS LINE FIXES THE POPUP CLICK ISSUE
        setOpen(false);

        const PaystackPop = (await import("@paystack/inline-js")).default;
        const paystack = new PaystackPop();

        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
          email: user.email!,
          amount: total * 100,
          ref: orderRef.id,
          callback: async () => {
            await updateDoc(doc(db, "orders", orderRef.id), {
              status: "paid",
              paymentRef: orderRef.id,
              paidAt: new Date()
            });
            toast.success("Payment successful! Order confirmed.");
            clear();
            setAddress("");
          },
          onClose: () => {
            toast.info("Payment cancelled");
            setLoading(false);
          },
        });
      } else {
        toast.success(
          method === "delivery"
            ? "Order placed! Pay on delivery."
            : "Installment request sent! We'll call you."
        );
        clear();
        setAddress("");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error("Order failed. Please try again.");
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5 text-[#4ca626]" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#4ca626] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[95vh] rounded-t-3xl overflow-y-auto">
        <div className="max-w-2xl mx-auto w-full px-4 pb-6">
          <div className="text-center py-6">
            <div className="w-20 h-1.5 bg-primary/30 rounded-full mx-auto mb-4" />
            <SheetTitle className="text-2xl font-bold">Your Cart ({cart.length} items)</SheetTitle>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-20 px-6">
              <p className="text-muted-foreground text-lg mb-8">Your cart is empty</p>
              <p className="text-3xl font-bold text-primary mb-10 leading-tight">
                Buy something that will benefit your future today.
              </p>
              <Link href="/shop" onClick={() => setOpen(false)}>
                <Button size="lg" className="w-full h-16 text-xl font-bold rounded-2xl bg-gradient-to-r to-[#4ca626] hover:from-green-700 hover:to-green-700 shadow-2xl">
                  Shop Now
                  <ArrowDown className="ml-3 h-6 w-6 animate-bounce" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-2xl p-4">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    ) : (
                      <div className="w-20 h-20 bg-muted rounded-xl" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-lg line-clamp-2">{item.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.quantity} × ₦{item.price.toLocaleString()}
                      </p>
                      <p className="font-bold text-xl mt-2 text-primary">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 h-10 w-10 p-0 rounded-full"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-3xl p-6 border space-y-6">
                <Input
                  placeholder="Delivery Address (Street, City, State)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-14 text-lg"
                />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">₦{total.toLocaleString()}</span>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() => handleCheckout("card")}
                    disabled={loading}
                    size="lg"
                    className="w-full h-16 text-xl font-bold rounded-2xl bg-[#4ca626] hover:bg-green-700"
                  >
                    {loading ? <Loader2 className="mr-3 h-7 w-7 animate-spin" /> : <CreditCard className="mr-3 h-7 w-7" />}
                    Pay Now with Card
                  </Button>

                  <Button
                    onClick={() => handleCheckout("delivery")}
                    disabled={loading}
                    size="lg"
                    variant="outline"
                    className="w-full h-16 text-xl font-bold rounded-2xl border-2"
                  >
                    <Truck className="mr-3 h-7 w-7" />
                    Pay on Delivery
                  </Button>

                  {!hasActiveInstallment ? (
                    <Button
                      onClick={() => handleCheckout("installment")}
                      disabled={loading}
                      size="lg"
                      variant="secondary"
                      className="w-full h-16 text-xl font-bold rounded-2xl"
                    >
                      <Calendar className="mr-3 h-7 w-7" />
                      Pay in Installments
                    </Button>
                  ) : (
                    <div className="bg-red-900/20 border-2 border-red-600 rounded-2xl p-6 text-center">
                      <p className="text-xl font-bold text-red-300 mb-2">
                        Installment Unavailable
                      </p>
                      <p className="text-sm opacity-90 mb-4">
                        You have an active plan. Complete it first.
                      </p>
                      <Link href="/dashboard" onClick={() => setOpen(false)}>
                        <Button variant="outline" size="lg" className="w-full h-14 text-lg border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
                          View Active Plan
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}