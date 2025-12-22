// app/dashboard/page.tsx — FINAL & PERFECT (ORDERS SHOW + STATUS UPDATES + NO ERRORS)
"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

import {
  LogOut,
  Package2,
  FileText,
  Clock,
  Truck,
  AlertCircle,
  UserIcon,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Check,
  X,
  Lock,
} from "lucide-react";

interface Quote {
  id: string;
  name: string;
  phone: string;
  location: string;
  currentBill: string;
  createdAt: any;
  status?: string;
}
interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  status: string;
  createdAt: any;
  paymentMethod?: string;
  installmentPlan?: any;
}
interface UserProfile {
  name?: string;
  phone?: string;
  address?: string;
}

export default function CustomerDashboard() {
  const { user, loading } = useAuth() as { user: User | null; loading: boolean };

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [installmentOrders, setInstallmentOrders] = useState<Order[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
const [logoutOpen, setLogoutOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
    router.push("/login");
  };
  const fetchUserProfile = async () => {
    if (!user) return;
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);
        setEditName(data.name || user.displayName || "");
        setEditPhone(data.phone || "");
        setEditAddress(data.address || "");
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword)
      return setPasswordError("New passwords do not match");
    if (newPassword.length < 6)
      return setPasswordError("Password must be at least 6 characters");

    setChangingPassword(true);
    setPasswordError("");

    try {
      if (!user?.email) throw new Error("No user email");
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      if (err.code === "auth/wrong-password")
        setPasswordError("Current password is incorrect");
      else if (err.code === "auth/too-many-requests")
        setPasswordError("Too many attempts. Try again later.");
      else setPasswordError("Failed to change password. Try again.");
    } finally {
      setChangingPassword(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: editName.trim() || "Customer",
          phone: editPhone.trim(),
          address: editAddress.trim(),
          updatedAt: new Date(),
        },
        { merge: true }
      );

      toast.success("Profile updated successfully!");
      setUserProfile({ name: editName, phone: editPhone, address: editAddress });
      setEditing(false);
    } catch (err) {
      toast.error("Failed to save profile");
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }
    if (!user) return;

    fetchUserProfile();

    // Quotes
    const quotesUnsub = onSnapshot(
      query(collection(db, "quotes"), where("email", "==", user.email!), orderBy("createdAt", "desc")),
      (snap) => {
        setQuotes(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Quote)));
      }
    );

    // Orders — FIXED: Now shows ALL orders including "paid"
    const ordersUnsub = onSnapshot(
      query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc")),
      (snap) => {
        const allOrders = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
        console.log("DASHBOARD ORDERS:", allOrders); // ← YOU WILL SEE YOUR ORDER HERE
        setOrders(allOrders);

        const activeInstallments = allOrders.filter(
          (o) =>
            o.paymentMethod === "installment" &&
            o.installmentPlan?.remainingAmount > 0
        );
        setInstallmentOrders(activeInstallments);
      }
    );

    return () => {
      quotesUnsub();
      ordersUnsub();
    };
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  if (!user) return null;

  const deliveredCount = orders.filter((o) => o.status === "delivered").length;
  const pendingCount = orders.filter((o) =>
    ["pending", "processing", "pending-pod", "pending-approval", "pending-payment"].includes(o.status)
  ).length;

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/videos/mfbg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="min-h-screen text-white relative">
        <nav className="container mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="text-xl font-bold">Hello, {userProfile.name || user.displayName || user.email}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setLogoutOpen(true)}>
            <LogOut className="h-5 w-5 mr-2" /> Logout
          </Button>
        </nav>

        <div className="px-6 pb-20">
          <div className="container mx-auto max-w-7xl">

            {/* Profile Section */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 text-white">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                        <UserIcon className="h-14 w-14 text-[#4ca626]" />
                      </div>
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-3xl text-[#4ca626]">My Profile</CardTitle>
                        <p className="text-gray-300">Keep your info updated</p>
                      </div>
                    </div>
                    <Button onClick={() => setEditing(true)} variant="outline" size="lg" disabled={editing} className="text-[#4ca626]">
                      <Edit2 className="h-5 w-5 mr-2" /> Edit
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {editing ? (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium">Full Name</label>
                          <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-2 h-12" placeholder="John Doe" />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2"><Mail className="h-4 w-4 text-white " /> Email</label>
                          <Input value={user.email || ""} disabled className="mt-2 h-12 bg-muted" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2"><Phone className="h-4 w-4" /> Phone</label>
                          <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="mt-2 h-12" placeholder="+234..." />
                        </div>
                        <div>
                          <label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4" /> Address</label>
                          <Input value={editAddress} onChange={(e) => setEditAddress(e.target.value)} className="mt-2 h-12" placeholder="12 Adeola Odeku..." />
                        </div>
                      </div>

                      <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3"><Lock className="h-6 w-6 text-primary" /> Change Password</h3>
                        <div className="space-y-4">
                          <Input type="password" placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-12" />
                          <Input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-12" />
                          <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12" />
                          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                          <Button onClick={handleChangePassword} disabled={changingPassword || !currentPassword || !newPassword || !confirmPassword} className="w-full h-12 text-[#4ca626]">
                            {changingPassword ? "Updating..." : "Update Password"}
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button onClick={saveProfile} size="lg" className="flex-1"><Check className="h-5 w-5 mr-2" /> Save Profile</Button>
                        <Button variant="outline" size="lg" onClick={() => setEditing(false)} className="flex-1 text-[#4ca626]"><X className="h-5 w-5 mr-2 text-[#4ca626]" /> Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-lg">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4"><UserIcon className="h-8 w-8 text-[#4ca626]" /><div><p className="text-gray-400">Name</p><p className="text-xl">{userProfile.name || user.displayName || "Not set"}</p></div></div>
                        <div className="flex items-center gap-4"><Mail className="h-8 w-8 text-blue-600" /><div><p className="text-gray-400">Email</p><p className="text-xl">{user.email}</p></div></div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4"><Phone className="h-8 w-8 text-yellow-300" /><div><p className="text-gray-400">Phone</p><p className="text-xl">{userProfile.phone || "Not added"}</p></div></div>
                        <div className="flex items-center gap-4"><MapPin className="h-8 w-8 text-pink-300" /><div><p className="text-gray-400">Address</p><p className="text-xl">{userProfile.address || "Not added"}</p></div></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <StatBox icon={<FileText className="h-12 w-12" />} label="Quotes" value={quotes.length} color="from-blue-600 to-blue-800" />
              <StatBox icon={<Package2 className="h-12 w-12" />} label="Orders" value={orders.length} color="from-green-600 to-emerald-700" />
              <StatBox icon={<Clock className="h-12 w-12" />} label="Pending" value={pendingCount} color="from-yellow-600 to-orange-600" />
              <StatBox icon={<Truck className="h-12 w-12" />} label="Delivered" value={deliveredCount} color="from-purple-600 to-pink-600" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 mb-20">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader><CardTitle className="text-2xl flex items-center gap-3"><Package2 className="text-green-400" /> Recent Orders</CardTitle></CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <p className="text-center py-16 text-gray-300">No orders yet. <a href="/products" className="text-green-400 underline">Shop now</a></p>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((o) => (
                          <div key={o.id} className="p-5 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                              <div>
                                <p className="font-bold">Order #{o.id.slice(-8).toUpperCase()}</p>
                                <p className="text-sm text-gray-400">₦{o.totalAmount.toLocaleString()}</p>
                              </div>
                              <p className={
                                o.status === "paid" || o.status === "delivered" ? "text-green-400" :
                                o.status === "pending-pod" || o.status === "pending-approval" ? "text-orange-400" :
                                "text-yellow-400"
                              }>
                                {o.status === "paid" ? "Paid" : 
                                 o.status === "pending-pod" ? "Pay on Delivery" :
                                 o.status === "pending-approval" ? "Installment Pending" :
                                 o.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-white/10 backdrop-blur-xl border-white/20">
                  <CardHeader><CardTitle className="text-2xl flex items-center gap-3"><FileText className="text-blue-400" /> Quote Requests</CardTitle></CardHeader>
                  <CardContent>
                    {quotes.length === 0 ? (
                      <p className="text-center py-16 text-gray-300">No quotes yet. <a href="/quote" className="text-blue-400 underline">Get a quote</a></p>
                    ) : (
                      <div className="space-y-4">
                        {quotes.slice(0, 5).map((q) => (
                          <div key={q.id} className="p-5 rounded-lg bg-white/5 border border-white/10">
                            <p className="font-bold">{q.location}</p>
                            <p className="text-sm text-gray-400">₦{q.currentBill} monthly bill</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Active Installment Plans */}
            {installmentOrders.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="">
                <h2 className="text-center text-4xl font-bold text-white mb-8">Active Installment Plans</h2>
                {installmentOrders.map((order) => {
                  const total = Number(order.totalAmount || 0);
                  const paid = Number(order.installmentPlan?.paidAmount || 0);
                  const remaining = total - paid;
                  const progress = total > 0 ? (paid / total) * 100 : 0;

                  return (
                    <Card key={order.id} className="bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-2xl border-4 border-yellow-300 shadow-2xl overflow-hidden mb-8">
                      <CardHeader className="text-center bg-black/40">
                        <h3 className="text-xl font-black text-yellow-300">Order #{order.id.slice(-8).toUpperCase()}</h3>
                      </CardHeader>
                      <CardContent className="text-white p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-center mb-8">
                          <div className="p-4 bg-white/10 rounded-2xl">
                            <p className="text-2xl font-bold">₦{total.toLocaleString()}</p>
                            <p className="text-lg opacity-80">Total</p>
                          </div>
                          <div className="p-4 bg-green-600/40 rounded-2xl border-4 border-green-500">
                            <p className="text-2xl font-black text-green-300">₦{paid.toLocaleString()}</p>
                            <p className="text-lg opacity-80">Paid</p>
                          </div>
                          <div className="p-6 bg-red-600/40 rounded-2xl border-4 border-red-500 animate-pulse">
                            <p className="text-3xl font-black text-red-300">₦{remaining.toLocaleString()}</p>
                            <p className="text-lg opacity-80">Remaining</p>
                          </div>
                        </div>

                        <div className="text-center mb-8">
                          <p className="text-2xl font-bold mb-4">Payment Progress</p>
                          <div className="w-full bg-white/20 rounded-full h-12 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-full flex items-center justify-center text-3xl font-black text-white transition-all duration-1000"
                              style={{ width: `${progress}%` }}
                            >
                              {Math.round(progress)}%
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-500/30 border-4 border-yellow-500 rounded-3xl p-6 text-center">
                          <p className="text-2xl font-black mb-2">Next Payment Due</p>
                          <p className="text-2xl font-black text-yellow-300">
                            {order.installmentPlan?.nextDueDate || "Contact Admin"}
                          </p>
                          <p className="text-lg font-bold text-red-400 mt-4">
                            New installment blocked until paid
                          </p>
                          <div className="bg-black/60 rounded-3xl p-4 mt-6">
                            <p className="font-bold">Pay to:</p>
                            <p className="text-xl font-black">Metrofolk Energy Ltd</p>
                            <p className="text-xl">0123456789 • GTBank</p>
                            <p className="text-lg mt-4">
                              WhatsApp proof: <a href="https://wa.me/2349012345678" className="underline font-bold">09012345678</a>
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            )}
          </div>
           {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Logout from Metrofolk?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out and redirected to the login page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            Yes, Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
      </div>
    </>
  );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className={`p-8 bg-gradient-to-br ${color} border-0 shadow-2xl text-white`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3">{icon}</div>
          <p className="text-5xl font-black">{value}</p>
          <p className="text-sm opacity-80 mt-2">{label}</p>
        </div>
      </Card>
    </motion.div>
  );
}