"use client";

import { useState, useEffect } from "react";
import { getRecipes } from "@/app/actions/recipes";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RecipeCard, RecipeCardSkeleton } from "./RecipeCard";
import { AlertTriangle, Sparkles } from "lucide-react";
import { Ingredient } from "@/app/actions/ingredients";

// Define the Recipe type
interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  ingredients: { name: string; quantity: string; }[];
  nutritionalInfo: { calories: string; protein: string; fat: string; carbohydrates: string; sugar: string; };
}

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
];

interface RecipesClientProps {
  initialIngredients: Ingredient[];
}

export default function RecipesClient({ initialIngredients }: RecipesClientProps) {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setRecipes(null);
    const generatedRecipes = await getRecipes(initialIngredients, selectedFilters);
    setRecipes(generatedRecipes);
    setIsLoading(false);
  };

  if (!isMounted) {
      return null; // Render nothing on the server to prevent hydration mismatch
  }

  return (
    <div>
      <div className="mb-8 p-6 bg-slate-900/50 border border-slate-700/50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-white">Dietary Filters</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {dietaryOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                onCheckedChange={() => handleFilterChange(option.id)}
                checked={selectedFilters.includes(option.id)}
              />
              <Label htmlFor={option.id} className="text-sm font-medium leading-none">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
            <Button onClick={handleGenerateRecipes} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Conjuring Recipes...' : 'Generate Recipes'}
            </Button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <RecipeCardSkeleton key={i} />)}
        </div>
      )}
      
      {recipes && recipes.length > 0 && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
      )}

      {recipes && recipes.length === 0 && !isLoading && (
         <div className="text-center py-10">
            <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
            <h3 className="mt-4 text-lg font-semibold">No Recipes Found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              We couldn't conjure any recipes. Check your API keys or try adjusting your selections.
            </p>
        </div>
      )}
    </div>
  );
}