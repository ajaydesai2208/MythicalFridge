"use client";

import * as React from "react";
import { AddIngredientDialog } from "@/components/AddIngredientDialog";
import { IngredientsTable } from "@/components/IngredientsTable";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

interface IngredientsClientProps {
  initialIngredients: Ingredient[];
  email: string;
}

export function IngredientsClient({
  initialIngredients,
  email,
}: IngredientsClientProps) {
  return (
    <ToastProvider>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Ingredients</h2>
        <AddIngredientDialog email={email} />
      </div>
      <IngredientsTable ingredients={initialIngredients} email={email} />
      <ToastViewport />
    </ToastProvider>
  );
}

IngredientsClient.displayName = "IngredientsClient";
