// lib/auth.ts
"use client";

import { useEffect, useState } from "react";
import {
  auth,
  db,
  googleProvider,
} from "./firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface CustomUser {
  uid: string;
  email: string;
  displayName?: string;
  name?: string;
  role: "admin" | "user";
}

const ADMIN_EMAIL = "your-real-email@gmail.com"; // ← CHANGE TO YOUR GMAIL

export function useAuth() {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        let userData = userSnap.data();

        if (!userSnap.exists()) {
          const isAdmin = firebaseUser.email === ADMIN_EMAIL;
          const newUser = {
            email: firebaseUser.email!,
            name: firebaseUser.displayName || firebaseUser.email!.split("@")[0],
            role: isAdmin ? "admin" : "user",
            createdAt: new Date(),
          };

          await setDoc(userRef, newUser);
          userData = newUser;
        }

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || undefined,
          name: userData?.name,
          role: userData?.role || "user",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/dashboard");
  };

  const register = async (email: string, password: string, name?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const displayName = name || email.split("@")[0];

    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      name: displayName,
      role: "user",
    });

    await updateProfile(cred.user, { displayName });
    router.push("/dashboard");
    return cred;
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
    router.push("/dashboard");
  };

  const logout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return {
    user,
    loading,
    login,
    register,
    googleLogin,
    logout,
  };
}