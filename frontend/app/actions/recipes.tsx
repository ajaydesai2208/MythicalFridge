"use server";

import { auth } from "@/auth";

// Define the types to match our backend models
export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

interface RecipeIngredient {
  name: string;
  quantity: string;
}

interface Instruction {
  id: number;
  step: string;
}

interface NutritionalInfo {
  calories?: string;
  protein?: string;
  fat?: string;
  carbohydrates?: string;
  sugar?: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: Instruction[];
  ingredients: RecipeIngredient[];
  nutritionalInfo?: NutritionalInfo;
  isFavorited: boolean; // <-- Add the new field
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getRecipes(
  ingredients: Ingredient[],
  dietaryFilters: string[]
): Promise<Recipe[] | null> {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (!userEmail) {
    console.error("User is not authenticated.");
    return null;
  }

  if (!ingredients || ingredients.length === 0) {
    console.error("Ingredients are required to generate recipes.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/recipes/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // THE FIX: Add userEmail to the request body
      body: JSON.stringify({
        userEmail: userEmail,
        ingredients: ingredients,
        dietaryFilters: dietaryFilters,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch recipes: ${response.status} ${errorText}`);
      return null;
    }

    const recipes: Recipe[] = await response.json();
    return recipes;

  } catch (error) {
    console.error("An error occurred while fetching recipes:", error);
    return null;
  }
}