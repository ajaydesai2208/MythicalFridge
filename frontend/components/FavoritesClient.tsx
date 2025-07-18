"use client";

import { RecipeCard } from "./RecipeCard";

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

interface FavoritesClientProps {
  recipes: Recipe[];
}

export default function FavoritesClient({ recipes }: FavoritesClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}