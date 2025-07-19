"use client";

import { useState, useEffect, useCallback } from "react"; // <-- Import useCallback
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addIngredient, deleteIngredientById, getIngredients } from "@/app/actions/ingredients";
import { useSession } from "next-auth/react";
import { Trash2, CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import AddIngredientDialog from "./AddIngredientDialog";
import { Button } from "@/components/ui/button";

// Define the Ingredient type based on your backend model
interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string;
}

export default function IngredientsClient() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  // THE FIX: Wrap fetchIngredients in useCallback
  const fetchIngredients = useCallback(async () => {
    if (session?.user?.email) {
      setIsLoading(true);
      const freshIngredients = await getIngredients(session.user.email);
      setIngredients(freshIngredients);
      setIsLoading(false);
    }
  }, [session]); // Dependency array for useCallback

  // Fetch initial data when the component mounts and the session is available
  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients, session]); // Add fetchIngredients to the dependency array

  const handleAddIngredient = async (name: string, quantity: number, unit: string, expirationDate: Date | undefined) => {
    if (!session?.user?.email || !expirationDate) return;
    const newIngredientData = { name, quantity, unit, expirationDate: format(expirationDate, "yyyy-MM-dd") };
    await addIngredient(session.user.email, newIngredientData);
    await fetchIngredients();
  };

  const handleDelete = async (id: number) => {
    if (!session?.user?.email) return;
    await deleteIngredientById(id);
    await fetchIngredients();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-10">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-500" />
          <p className="mt-4 text-muted-foreground">Loading Your Fridge...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <AddIngredientDialog onAddIngredient={handleAddIngredient} />
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle>Your Ingredients</CardTitle>
          <CardDescription>
            A list of all items currently in your fridge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ingredients.length > 0 ? (
            <ul className="space-y-3">
              {ingredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-4">
                    <span className="font-semibold text-lg text-emerald-400 capitalize">{ingredient.name}</span>
                    <span className="text-muted-foreground">{ingredient.quantity} {ingredient.unit}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Expires: {format(new Date(ingredient.expirationDate), "MMM dd, yyyy")}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(ingredient.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 border-2 border-dashed border-slate-700 rounded-lg">
              <p className="text-muted-foreground">Your fridge is empty.</p>
              <p className="text-sm text-slate-500">Click "Add Ingredient" to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}