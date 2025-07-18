"use client";

import * as React from "react";
import { AddRecipeDialog } from "./AddRecipeDialog";
import { RecipesTable, type Recipe } from "./RecipesTable";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export interface RecipesClientProps {
  initialRecipes: Recipe[];
  email: string;
}

export function RecipesClient({ initialRecipes, email }: RecipesClientProps) {
  return (
    <ToastProvider>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <AddRecipeDialog email={email} />
      </div>
      <RecipesTable recipes={initialRecipes} email={email} />
      <ToastViewport />
    </ToastProvider>
  );
}
