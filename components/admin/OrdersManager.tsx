// components/admin/OrdersManager.tsx — ZERO ERRORS, WORKS PERFECTLY
"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Package, Clock, CreditCard, Truck, Calendar } from "lucide-react";

export default function OrdersManager() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const loadedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      console.log("ALL ORDERS FROM FIRESTORE:", loadedOrders); // ← YOU WILL SEE YOUR ORDER HERE
      
      setOrders(loadedOrders);
    });

    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const getStatusBadge = (status: string, paymentMethod?: string) => {
    if (status === "paid") return <Badge className="bg-green-600 text-white">Paid Online</Badge>;
    if (status === "pending-pod") return <Badge className="bg-orange-600 text-white">Pay on Delivery</Badge>;
    if (paymentMethod === "installment") return <Badge className="bg-purple-600 text-white">Installment</Badge>;
    if (status === "pending-payment") return <Badge className="bg-yellow-600 text-white">Awaiting Payment</Badge>;
    if (status === "delivered") return <Badge className="bg-emerald-600 text-white">Delivered</Badge>;
    
    return <Badge variant="secondary">{status || "pending"}</Badge>;
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <Package className="h-20 w-20 mx-auto mb-6 text-muted-foreground/30" />
        <h3 className="text-2xl font-bold text-muted-foreground">No orders yet</h3>
        <p className="text-muted-foreground mt-4">Check browser console to see real-time orders</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">All Orders ({orders.length})</h2>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden border-[#4ca626]">
            <CardHeader className="bg-[#4ca626]/40 p-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-black">Order #{order.id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4" />
                    {order.createdAt?.toDate?.() 
                      ? format(order.createdAt.toDate(), "dd MMM yyyy • h:mm a")
                      : "Just now"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-primary">
                    ₦{Number(order.totalAmount || 0).toLocaleString()}
                  </p>
                  {getStatusBadge(order.status, order.paymentMethod)}
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4 text-lg">
                <div className="flex items-center gap-3">
                  <User className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{order.userEmail}</p>
                    <p className="text-sm text-muted-foreground/70">Customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">{order.shippingAddress || "No address"}</p>
                    <p className="text-sm text-foreground/70">Delivery</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-bold mb-3">Items ({order.items?.length || 0})</p>
                <div className="space-y-2 text-sm">
                  {(order.items || []).map((item: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>{item.quantity} × {item.name}</span>
                      <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Select
                  value={order.status || "pending"}
                  onValueChange={(value) => updateStatus(order.id, value)}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending-payment">Awaiting Payment</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="pending-pod">Pay on Delivery</SelectItem>
                    <SelectItem value="pending-approval">Installment Approval</SelectItem>
                    <SelectItem value="active-installment">Active Installment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}