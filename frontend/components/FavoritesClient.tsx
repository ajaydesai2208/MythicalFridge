"use client";

import { useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Recipe } from "@/app/actions/recipes"; // Import the Recipe type

interface FavoritesClientProps {
  initialRecipes: Recipe[];
}

export default function FavoritesClient({ initialRecipes }: FavoritesClientProps) {
  // State to manage the displayed list of favorite recipes
  const [favoriteRecipes, setFavoriteRecipes] = useState(initialRecipes);

  // This function will be called by a RecipeCard when it is unfavorited
  const handleFavoriteToggle = (recipeId: number) => {
    // Filter the list to remove the recipe with the matching id
    setFavoriteRecipes((currentFavorites) =>
      currentFavorites.filter((recipe) => recipe.id !== recipeId)
    );
  };
  
  // If, after filtering, there are no favorites left, show a message
  if (favoriteRecipes.length === 0) {
      return (
        <div className="text-center">
            <h3 className="mt-4 text-lg font-semibold">No Favorites Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                When you favorite a recipe, it will appear here.
            </p>
        </div>
      )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favoriteRecipes.map((recipe) => (
        <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onFavoriteToggle={handleFavoriteToggle} // Pass the handler function as a prop
        />
      ))}
    </div>
  );
}