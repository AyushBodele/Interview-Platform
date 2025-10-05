"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AuthForm = ({ type }: { type?: FormType }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (loading) return; // prevent multiple clicks
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = type === "sign-in";

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
            {loading
              ? isSignIn
                ? "Signing in..."
                : "Creating your account..."
              : isSignIn
              ? "Continue with Google"
              : "Sign up with Google"}
          </Button>
        </div>

        <p className="text-center mt-4">
          {isSignIn ? "New to PrepWise?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
