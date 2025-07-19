"use server";

import { revalidatePath } from "next/cache";

// This interface should be consistent across your actions files
export interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function getIngredients(userEmail: string): Promise<Ingredient[]> {
  if (!userEmail) return [];

  try {
    const response = await fetch(`${API_BASE_URL}/api/ingredients/get?userEmail=${encodeURIComponent(userEmail)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store', // Always get the latest ingredients
    });

    if (!response.ok) {
      throw new Error("Failed to fetch ingredients");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
}

export async function addIngredient(userEmail: string, ingredientData: { name: string; quantity: number; unit: string; expirationDate: string; }): Promise<Ingredient> {
    const response = await fetch(`${API_BASE_URL}/api/ingredients/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, ingredient: ingredientData }),
    });

    if (!response.ok) {
        throw new Error('Failed to add ingredient');
    }
    revalidatePath('/ingredients'); // This tells Next.js to refresh the ingredients page
    return response.json();
}

export async function deleteIngredientById(id: number): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/api/ingredients/delete/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete ingredient');
    }
    revalidatePath('/ingredients'); // Refresh the page data
    return { success: true };
}