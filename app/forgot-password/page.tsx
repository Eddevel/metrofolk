// app/forgot-password/page.tsx
"use client";

import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "sent" | "notfound" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    if (!email.trim() || !email.includes("@")) {
      setMessage("Enter a valid email");
      return;
    }

    setStatus("checking");
    setMessage("");

    try {
      // Check if user exists in Firestore
      const q = query(
        collection(db, "users"),
        where("email", "==", email.trim().toLowerCase()),
        limit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setStatus("notfound");
        setMessage("No account found with this email.");
        return;
      }

      // User exists → send reset email
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email.trim(), {
        url: `${window.location.origin}/login`,
      });

      setStatus("sent");
      setMessage("Password reset link sent! Check your inbox.");

    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to send email. Call 0903 333 7777");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-2xl p-8 border">

          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-[#4ca626]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-10 w-10 text-primary " />
            </div>
            <h1 className="text-3xl md:text-4xl font-black">Forgot Password?</h1>
            <p className="text-muted-foreground mt-3">We’ll send you a reset link</p>
          </div>

          {status === "sent" && (
            <div className="text-center py-12 space-y-6">
              <CheckCircle2 className="h-20 w-20 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">Check Your Email</h2>
              <p className="text-lg text-muted-foreground">{message}</p>
              <Link href="/login"><Button className="w-full  h-14 text-lg mt-6">Back to Login</Button></Link>
            </div>
          )}

          {status === "notfound" && (
            <div className="text-center py-12 space-y-6">
              <AlertCircle className="h-20 w-20 text-orange-600 mx-auto" />
              <h2 className="text-2xl font-bold">No Account Found</h2>
              <p className="text-lg text-muted-foreground">{message}</p>
              <Link href="/register"><Button className="w-full bg-[#4ca626] h-14 text-lg mt-6">Create Account</Button></Link>
            </div>
          )}

          {(status === "idle" || status === "checking" || status === "error") && (
            <>
              <Input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-lg"
                disabled={status === "checking"}
                onKeyDown={(e) => e.key === "Enter" && handleReset()}
              />

              {message && (
                <p className={`text-sm mt-3 text-center ${status === "error" ? "text-red-600" : "text-orange-600"}`}>
                  {message}
                </p>
              )}

              <Button
                onClick={handleReset}
                disabled={status === "checking" || !email.includes("@")}
                className="w-full bg-[#4ca626] h-14 text-lg font-bold mt-6"
              >
                {status === "checking" ? "Please wait..." : "Send Reset Link"}
              </Button>
            </>
          )}

          <div className="mt-8 text-center space-y-4">
            <Link href="/login" className="text-sm text-primary hover:underline flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
            <div className="text-xs text-muted-foreground pt-6 border-t">
              <p>Need help?</p>
              <a href="tel:07050698372" className="font-bold text-primary text-lg block mt-2">
                Call 0705 069 8372
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}