// components/admin/AdminDashboard.tsx — FINAL & PERFECT (ALL ORDERS SHOW INCLUDING CARD PAYMENTS)
"use client";

import {useState} from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

import ProductManager from "./ProductManager";
import BlogManager from "./BlogManager";
import OrdersManager from "./OrdersManager";
import QuoteManager from "./QuoteManager";
import AnalyticsDashboard from "./AnalyticsDashboard";
import ContactManager from "./ContactManager";
import InstallmentsManager from "./InstallmentsManager";
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
import { useRouter } from 'next/navigation';
export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const router = useRouter();
  

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background px-5">
      <header className=" border-b bg-card">
        <div className="container flex h-16 items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user?.displayName || user?.email}
            </p>
          </div>
          <Button variant="ghost" onClick={() => setLogoutOpen(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 p-1 bg-muted/50 rounded-xl">
            <TabsTrigger value="orders" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Orders
            </TabsTrigger>
            <TabsTrigger value="installments">Installments</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* THIS IS THE ONLY IMPORTANT PART — ORDERS TAB FIRST & SHOWS EVERYTHING */}
          <TabsContent value="orders" className="mt-0">
            <OrdersManager />
          </TabsContent>

          <TabsContent value="installments">
            <InstallmentsManager />
          </TabsContent>

          <TabsContent value="products">
            <ProductManager />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManager />
          </TabsContent>

          <TabsContent value="quotes">
            <QuoteManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>

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
      </main>
    </div>
  );
}