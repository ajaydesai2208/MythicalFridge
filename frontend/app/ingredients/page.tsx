"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AddIngredientDialog } from "@/components/AddIngredientDialog";
import { IngredientsTable } from "@/components/IngredientsTable";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export default function IngredientsPage() {
  const { data: session, status } = useSession();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  // Once we have a session (authenticated), fetch ingredients
  useEffect(() => {
    if (status !== "authenticated") return;
    const email = session.user?.email;
    if (!email) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/get?email=${encodeURIComponent(
        email
      )}`,
      { cache: "no-store" }
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        return res.json() as Promise<Ingredient[]>;
      })
      .then((data) => setIngredients(data))
      .catch((err) => {
        console.error("Failed to load ingredients:", err);
      })
      .finally(() => setLoading(false));
  }, [status, session]);

  if (status === "loading" || loading) {
    return <p className="p-4">Loading ingredients…</p>;
  }

  if (status !== "authenticated" || !session.user?.email) {
    return <p className="p-4 text-red-500">Not authenticated.</p>;
  }

  const email = session.user.email;

  return (
    <div className="container mx-auto p-4">
      <ToastProvider>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Ingredients</h2>
          <AddIngredientDialog email={email} />
        </div>

        {/* Now fully client: filter, paginate, and dialogs will never SSR */}
        <IngredientsTable ingredients={ingredients} email={email} />

        <ToastViewport />
      </ToastProvider>
    </div>
  );
}