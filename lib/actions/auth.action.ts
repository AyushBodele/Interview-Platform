"use server";

import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/utils";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch profile from public table `users`
  const { data: profile } = await supabase
    .from("users")
    .select("id, name, email")
    .eq("id", user.id)
    .single();

  if (!profile) {
    const fallback: User = {
      id: user.id,
      name: user.user_metadata?.name || user.email!,
      email: user.email!,
    };
    // Ensure profiles exist
    await supabase.from("users").upsert(fallback);
    return fallback;
  }
  return profile as User;
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
