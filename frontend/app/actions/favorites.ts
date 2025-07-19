"use server";

import { revalidatePath } from "next/cache";

// Define the types to match our backend models
interface RecipeIngredient {
  name: string;
  quantity: string;
}

// THE FIX: Define the new Instruction type
interface Instruction {
  id: number;
  step: string;
}

interface NutritionalInfo {
  calories: string;
  protein: string;
  fat: string;
  carbohydrates: string;
  sugar: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: Instruction[]; // <-- Updated to an array of Instruction objects
  ingredients: RecipeIngredient[];
  nutritionalInfo?: NutritionalInfo;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getFavoriteRecipes(userEmail: string): Promise<Recipe[] | null> {
  if (!userEmail) {
    console.error("User email is required to fetch favorites.");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/favorites/get?userEmail=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to fetch favorite recipes: ${response.status} ${errorText}`);
      return null;
    }

    const favorites: Recipe[] = await response.json();
    return favorites;

  } catch (error) {
    console.error("An error occurred while fetching favorite recipes:", error);
    return null;
  }
}

export async function toggleFavoriteStatus(userEmail: string, recipeId: number) {
  if (!userEmail || !recipeId) {
    console.error("User email and recipe ID are required.");
    return { success: false };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/favorites/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, recipeId }),
    });

    if (!response.ok) {
      console.error("Failed to toggle favorite status");
      return { success: false };
    }

    revalidatePath("/favorites");
    revalidatePath("/recipes"); // Also revalidate recipes in case we want to show a favorited status there later
    return { success: true };

  } catch (error) {
    console.error("Error toggling favorite status:", error);
    return { success: false };
  }
}