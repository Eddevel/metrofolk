// types/firebase.d.ts
import "@firebase/auth";
import "firebase/firestore";

declare module "firebase/auth" {
  interface User {
    displayName: string | null;
    photoURL: string | null;
    email: string | null;
    phoneNumber: string | null;
    providerData: any[];
    role?: "admin" | "user"; // Add your custom role here
  }
}