// app/recipes/page.tsx
import React from "react";
import { auth } from "@/auth";
import { RecipesClient, type Recipe } from "@/components/RecipesClient";

async function fetchRecipes(email: string): Promise<Recipe[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes/get?email=${encodeURIComponent(
      email
    )}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch recipes (${res.status})`);
  return res.json();
}

export default async function RecipesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }
  const email = session.user.email;
  const recipes = await fetchRecipes(email);

  return (
    <div className="container mx-auto p-4">
      {/* server-only: fetch + pass into client wrapper */}
      <RecipesClient initialRecipes={recipes} email={email} />
    </div>
  );
}
