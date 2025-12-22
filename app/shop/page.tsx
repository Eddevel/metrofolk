import { Suspense } from "react";
import ShopPage from "@/components/ShopPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading shop...</div>}>
      <ShopPage />
    </Suspense>
  );
}