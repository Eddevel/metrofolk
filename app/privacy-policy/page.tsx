// app/privacy-policy/page.tsx
import { Metadata } from "next";
import { Shield, Lock, Eye, Mail, Smartphone, Cookie, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Metrofolk  Your Data is Safe With Us",
  description: "We respect your privacy. This policy explains how Metrofolk collects, uses and protects your personal information when you use our website and services.",
};

export default function PrivacyPolicy() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-5 text-center">
          <Shield className="h-20 w-20 mx-auto mb-6 text-green-400" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Your Privacy Matters</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90">
            At Metrofolk, we are committed to protecting your personal information and your right to privacy.
          </p>
          <p className="mt-4 text-lg opacity-80">Last updated: December 2025</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-5 max-w-5xl">
          <div className="prose prose-lg mx-auto text-gray-700 space-y-12">

            {/* 1. Information We Collect */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Lock className="h-8 w-8 text-blue-600" />
                1. Information We Collect
              </h2>
              <p className="text-lg leading-relaxed">
                When you visit our website, place an order, or contact us, we may collect the following information:
              </p>
              <ul className="mt-6 space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Personal Information:</strong> Name, phone number, email address, delivery address</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Order Details:</strong> Products purchased, payment method (we do NOT store card details)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Technical Data:</strong> IP address, browser type, device info, pages visited</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <span><strong>Communication:</strong> Messages sent via WhatsApp, email, or contact form</span>
                </li>
              </ul>
            </div>

            {/* 2. How We Use Your Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Eye className="h-8 w-8 text-green-600" />
                2. How We Use Your Information
              </h2>
              <p className="text-lg leading-relaxed">We use your information only to:</p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[
                  "Process and deliver your orders",
                  "Send order updates via SMS/WhatsApp",
                  "Respond to your inquiries",
                  "Improve our website and services",
                  "Send promotional offers (you can opt out anytime)",
                  "Prevent fraud and ensure security",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4 bg-green-50 p-5 rounded-xl">
                    <CheckCircle2 className="h-7 w-7 text-green-600 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Data Protection */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-10 shadow-xl">
              <h2 className="text-3xl font-black mb-6">Your Data Is 100% Secure</h2>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <Lock className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">Encrypted Storage</p>
                  <p className="mt-2 opacity-90">All data protected with bank-level encryption</p>
                </div>
                <div className="text-center">
                  <Shield className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">No Card Details Stored</p>
                  <p className="mt-2 opacity-90">Payments processed securely via Paystack</p>
                </div>
                <div className="text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">WhatsApp Privacy</p>
                  <p className="mt-2 opacity-90">Messages are end-to-end encrypted</p>
                </div>
              </div>
            </div>

            {/* 4. Cookies */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Cookie className="h-8 w-8 text-orange-600" />
                4. Cookies & Tracking
              </h2>
              <p className="text-lg leading-relaxed">
                We use cookies to improve your experience:
              </p>
              <ul className="mt-6 space-y-3 text-lg">
                <li>• Remember items in your cart</li>
                <li>• Analyze website traffic (Google Analytics)</li>
                <li>• Show you relevant products</li>
              </ul>
              <p className="mt-6 text-lg font-medium text-green-700">
                You can disable cookies in your browser settings anytime.
              </p>
            </div>

            {/* 5. Sharing Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-black mb-6">5. We Never Sell Products, Not Data</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                We <strong>DO NOT</strong> sell, rent, or share your personal information with third parties except:
              </p>
              <ul className="mt-6 space-y-4 text-lg">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  Delivery partners (name + phone + address only)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  Payment processors (Paystack – PCI DSS compliant)
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  Legal requirements (if required by Nigerian law)
                </li>
              </ul>
            </div>

            {/* 6. Your Rights */}
            <div className="bg-green-50 border-2 border-green-600 rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-black mb-6">Your Rights – Always</h2>
              <p className="text-xl mb-8">You have the full right to:</p>
              <div className="space-y-4 text-lg font-medium">
                <p>Request a request to access your personal data</p>
                <p> a request correction of inaccurate data</p>
                <p> a request deletion of your data ("Right to be forgotten")</p>
                <p>Opt out of marketing messages anytime</p>
              </div>
              <div className="mt-10">
                <a href="mailto:privacy@metrofolk.com" className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xl px-10 py-5 rounded-full transition">
                  <Mail className="h-6 w-6" />
                  Email Us: privacy@metrofolk.org
                </a>
              </div>
            </div>

            {/* 7. Contact */}
            <div className="text-center py-12">
              <h2 className="text-3xl font-black mb-6">Questions About Privacy?</h2>
              <p className="text-xl mb-8">Our team is here 24/7 to help.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="tel:+2349012345678" className="text-2xl font-bold text-blue-600">
                  Call: 0705 069 8372
                </a>
                <span className="text-2xl">•</span>
                <a href="https://wa.me/2347050698372" className="text-2xl font-bold text-green-600">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}