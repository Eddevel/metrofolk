// components/admin/InstallmentsManager.tsx — FINAL: NO DOUBLE PAYMENTS + MOBILE PERFECT
"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  User,
  Phone,
  CheckCircle2,
  History,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

interface Payment {
  amount: number;
  date: Date | { seconds: number };
  method: string;
  recordedBy?: string;
}

interface InstallmentOrder {
  id: string;
  userEmail: string;
  phoneNumber: string;
  customerName?: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: string;
  installmentPlan: {
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    nextDueDate?: string;
    payments: Payment[];
  };
}

export default function InstallmentsManager() {
  const [installments, setInstallments] = useState<InstallmentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("paymentMethod", "==", "installment"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data: InstallmentOrder[] = [];

      snap.docs.forEach((doc) => {
        const raw = doc.data();
        const plan = raw.installmentPlan || {};

        const total = Number(raw.totalAmount || plan.totalAmount || 0);
        const paid = Number(plan.paidAmount || 0);

        if (total === 0) return;

        const payments: Payment[] = Array.isArray(plan.payments)
          ? plan.payments.map((p: any) => ({
              amount: Number(p.amount) || 0,
              date: p.date?.toDate ? p.date.toDate() : new Date(p.date || Date.now()),
              method: p.method || "unknown",
              recordedBy: p.recordedBy,
            }))
          : [];

        data.push({
          id: doc.id,
          userEmail: raw.userEmail || "N/A",
          phoneNumber: raw.phoneNumber || "N/A",
          customerName: raw.customerName || undefined,
          totalAmount: total,
          paidAmount: paid,
          remainingAmount: total - paid,
          status: raw.status || "pending-approval",
          installmentPlan: {
            totalAmount: total,
            paidAmount: paid,
            remainingAmount: total - paid,
            nextDueDate: plan.nextDueDate || undefined,
            payments,
          },
        });
      });

      const activeOnly = data.filter((order) => order.status !== "paid");
      setInstallments(activeOnly);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const recordPayment = async (orderId: string, amount: number) => {
    try {
      const currentOrder = installments.find((o) => o.id === orderId);
      if (!currentOrder) return;

      const newPaid = currentOrder.paidAmount + amount;
      const remaining = currentOrder.totalAmount - newPaid;

      await updateDoc(doc(db, "orders", orderId), {
        "installmentPlan.paidAmount": newPaid,
        "installmentPlan.remainingAmount": remaining,
        "installmentPlan.payments": [
          ...currentOrder.installmentPlan.payments,
          {
            amount,
            date: new Date(),
            method: "bank-transfer",
            recordedBy: "admin",
          },
        ],
        "installmentPlan.nextDueDate": format(
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          "yyyy-MM-dd"
        ),
        status: remaining <= 0 ? "paid" : "active-installment",
      });

      toast.success(`₦${amount.toLocaleString()} recorded successfully!`);
      // REMOVED LOCAL STATE UPDATE — onSnapshot will refresh automatically
    } catch (error) {
      console.error("Payment record failed:", error);
      toast.error("Failed to record payment");
    }
  };

  const sendReminder = async (email: string, name: string | undefined, remaining: number) => {
    try {
      const res = await fetch("/api/send-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          customerName: name || "Customer",
          remainingAmount: remaining,
        }),
      });

      if (res.ok) toast.success(`Reminder sent to ${email}`);
      else toast.error("Failed to send reminder");
    } catch {
      toast.error("Network error");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <p className="text-4xl font-black text-purple-600">Loading...</p>
      </div>
    );
  }

  if (installments.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-8 p-8 text-center">
        <Calendar className="h-24 w-24 text-purple-300" />
        <h2 className="text-4xl font-black text-purple-700">No Active Installments</h2>
        <p className="text-lg text-gray-600">All customers are fully paid</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-10 text-center text-4xl font-black text-purple-800 md:text-6xl">
          ACTIVE INSTALLMENTS ({installments.length})
        </h1>

        <div className="space-y-10">
          {installments.map((order) => {
            const progress = (order.paidAmount / order.totalAmount) * 100;

            return (
              <Card key={order.id} className="overflow-hidden rounded-3xl border-4 border-purple-600 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-2xl font-black md:text-4xl">
                        #{order.id.slice(-8).toUpperCase()}
                      </p>
                      <Badge className="mt-2 text-lg">
                        {order.status === "active-installment" ? "ACTIVE" : "PENDING APPROVAL"}
                      </Badge>
                    </div>
                    <p className="text-3xl font-black md:text-5xl">
                      ₦{order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-8 bg-white p-6">
                  <div className="grid grid-cols-1 gap-6 text-lg sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-bold">{order.userEmail}</p>
                        <p className="text-sm text-gray-600">{order.customerName || "Customer"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-8 w-8 text-purple-600" />
                      <p className="font-bold">{order.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8 text-purple-600" />
                      <p className="font-bold">Next: {order.installmentPlan.nextDueDate || "—"}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <div className="text-2xl font-black md:text-3xl">
                      Paid: <span className="text-green-600">₦{order.paidAmount.toLocaleString()}</span> | 
                      Remaining: <span className="text-red-600">₦{order.remainingAmount.toLocaleString()}</span>
                    </div>
                    <div className="mx-auto h-20 w-full max-w-md overflow-hidden rounded-full bg-gray-200 shadow-lg">
                      <div
                        className="flex h-full items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-4xl font-black text-white transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      >
                        {Math.round(progress)}%
                      </div>
                    </div>
                  </div>

                  {order.installmentPlan.payments.length > 0 && (
                    <div className="rounded-2xl border-2 border-gray-300 bg-gray-50 p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <History className="h-7 w-7 text-purple-600" />
                        <h3 className="text-2xl font-black">Payment History</h3>
                      </div>
                      <div className="space-y-3">
                        {order.installmentPlan.payments.map((p, i) => (
                          <div key={i} className="flex flex-col rounded-lg border bg-white p-4 text-center sm:flex-row sm:justify-between sm:text-left">
                            <span className="font-bold text-lg">₦{p.amount.toLocaleString()}</span>
                            <span className="text-gray-600">
                              {format(p.date instanceof Date ? p.date : new Date(), "dd MMM yyyy")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-6">
                    {order.remainingAmount > 0 && (
                      <div className="rounded-3xl border-4 border-green-600 bg-green-50 p-6">
                        <h3 className="mb-6 text-center text-2xl font-black">Record Payment</h3>
                        <div className="flex flex-col items-center gap-4">
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            className="h-16 w-full max-w-xs text-center text-2xl font-bold"
                            id={`pay-${order.id}`}
                          />
                          <Button
                            size="lg"
                             className="h-16 w-full max-w-xs text-2xl font-bold bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              const input = document.getElementById(`pay-${order.id}`) as HTMLInputElement;
                              if (!input || !input.value) return;
                              const amt = Number(input.value);
                              if (amt > 0 && amt <= order.remainingAmount) {
                                recordPayment(order.id, amt);
                                input.value = "";
                              } else {
                                toast.error("Invalid amount");
                              }
                            }}
                          >
                            <CheckCircle2 className="mr-3 h-8 w-8" /> RECORD PAYMENT
                          </Button>
                        </div>
                      </div>
                    )}

                    <Button
                      size="lg"
                      variant="outline"
                      className="h-16 border-4 border-purple-600 text-2xl font-bold text-purple-700 hover:bg-purple-50"
                      onClick={() => sendReminder(order.userEmail, order.customerName, order.remainingAmount)}
                    >
                      <Mail className="mr-4 h-9 w-9" /> SEND REMINDER
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}