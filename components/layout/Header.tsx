// components/layout/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
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
import { cn } from "@/lib/utils";
import CartDrawer from "../CartDrawer";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Shop", href: "/shop" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
    setMobileOpen(false);
    router.push("/login");
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold">Metrofolk
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b flex  justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full ">
      <div className="container h-15  items-center flex justify-between ">
        {/* Logo */}
        <div className="   " >
          <div className=" ml-0 w-40 mr-10  flex justify-center ">
          <Link href="/" className="flex items-center gap-1 ">
          <Image src="/images/2.svg" loading="eager" alt="" width={50} height={50} className=" object-cover h-14 w-auto "/>

        </Link>
        </div>

        </div>
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden  lg:inline ">
          <NavigationMenuList >
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label} >
                <NavigationMenuLink asChild className="text-[#4ca626] font-bold ">
                  <Link  href={item.href} className="">
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            {/* Auth Section */}
            {!loading && user ? (
              <>
              <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/dashboard" className='text-[#4ca626] font-bold'>
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {user.role === "admin" && (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/admin" className={cn(navigationMenuTriggerStyle(), "text-red-600 font-bold ")}>
                        Admin Panel
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
                
                <NavigationMenuItem>
                  <Button variant="ghost" onClick={() => setLogoutOpen(true)} className="text-red-600 font-bold">
                    <LogOut className=" h-4 w-2" />
                    Logout
                  </Button>
                </NavigationMenuItem>
              </>
            ) : !loading ? (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/login" className='flex flex-row text-[#4ca626] font-bold'>
                    <LogOut className=" h-4 w-2 text-[#4ca626]" />
                    Login
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : null}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <CartDrawer/>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-[#4ca626]" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-[#4ca626]" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden ">
                <Menu className="h-6 w-6 text-[#4ca626]"  />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for Metrofolk website
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-3 items-center px-5">
                <Link href="/" className="flex flex-col items-center" onClick={() => setMobileOpen(false)}>
                  <Image src="/images/2.svg" loading="eager" alt="Metrofolk" width={100} height={100} className="w-auto h-20"/>

                </Link>
                

                <nav className="flex flex-col gap-5 ">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-bold w-full  text-center px-9 text-[#4ca626]   "
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    
                    
                  ))}

                  {/* Auth Links in Mobile */}
                  {!loading && user ? (
                    <>
                    <Link
                        href="/dashboard"
                        className="text-lg font-medium w-full text-[#4ca626] text-center"
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          className="text-lg font-bold text-red-600 w-full  text-center"
                          onClick={() => setMobileOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      
                      <Button
                        
                        className="w-full mt-4 bg-red-600 text-white "
                        onClick={() => {
                          setLogoutOpen(true);
                          setMobileOpen(false);
                        }}
                      >
                        <LogOut className=" h-4 w-4 " />
                        Logout
                      </Button>
                    </>
                  ) : !loading ? (
                    <Link
                      href="/login"
                      className="text-lg font-medium text-[#4ca626] text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </Link>
                  ) : null}

                  
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
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
  </header>
);
}