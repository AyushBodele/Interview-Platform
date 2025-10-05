"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/client";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Button } from "@/components/ui/button";

const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      // Try popup sign-in
      const result = await signInWithPopup(auth, provider).catch(async (err) => {
        console.warn("Popup failed, falling back to redirect:", err);
        await signInWithRedirect(auth, provider); // fallback
        return null;
      });

      if (result?.user) {
        const user = result.user;
        toast.success(`Signed in as ${user.displayName || user.email}`);
        router.push("/"); // redirect after login
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <div className="flex flex-col gap-4 mt-6">
          <Button onClick={handleGoogleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </div>

        <p className="text-center mt-4">
          New to PrepWise?{" "}
          <Link href="/sign-up" className="font-bold text-user-primary ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
