"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function cookRecipeAction(userEmail: string, recipeId: number): Promise<{ success: boolean; message: string; }> {
  if (!userEmail || !recipeId) {
    return { success: false, message: "User email and recipe ID are required." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/cookRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail, recipeId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to cook recipe: ${response.status} ${errorText}`);
      return { success: false, message: "Failed to update fridge." };
    }

    // This is a key part: it tells Next.js to refresh the data on the ingredients page,
    // so the user will see their updated fridge inventory.
    revalidatePath('/ingredients');
    return { success: true, message: "Enjoy your meal! Your fridge has been updated." };

  } catch (error) {
    console.error("An error occurred while cooking the recipe:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}