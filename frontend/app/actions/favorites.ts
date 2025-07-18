"use server";

// Define the types to match our backend models
interface RecipeIngredient {
  name: string;
  quantity: string;
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
  instructions: string;
  ingredients: RecipeIngredient[];
  nutritionalInfo: NutritionalInfo;
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
      cache: 'no-store', // Ensures we always get the latest favorites
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