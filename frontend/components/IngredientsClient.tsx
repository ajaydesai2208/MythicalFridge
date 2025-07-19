"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addIngredient, deleteIngredientById, getIngredients } from "@/app/actions/ingredients";
import { useSession } from "next-auth/react";
import { PlusCircle, Trash2, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import AddIngredientDialog from "./AddIngredientDialog";

// Define the Ingredient type based on your backend model
interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: string; // Comes as a string from the backend
}

interface IngredientsClientProps {
  initialIngredients: Ingredient[];
}

export default function IngredientsClient({
  initialIngredients,
}: IngredientsClientProps) {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // This ensures the component only renders its full content on the client
    setIsMounted(true);
  }, []);

  const handleAddIngredient = async (name: string, quantity: number, unit: string, expirationDate: Date | undefined) => {
    if (!session?.user?.email || !expirationDate) return;

    const newIngredientData = { name, quantity, unit, expirationDate: format(expirationDate, "yyyy-MM-dd") };
    
    // Call the server action and wait for the actual created ingredient
    const addedIngredient = await addIngredient(session.user.email, newIngredientData);
    
    // Update the state with the confirmed ingredient from the database
    if (addedIngredient) {
        setIngredients(prev => [...prev, addedIngredient]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!session?.user?.email) return;
    // Call server action to delete
    await deleteIngredientById(id);
    // Refetch the list from the server to ensure consistency
    const updatedIngredients = await getIngredients(session.user.email);
    setIngredients(updatedIngredients);
  };

  // Render a loading state until the component is mounted on the client
  if (!isMounted) {
    return (
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="flex justify-end mb-4">
                 <div className="h-10 w-36 bg-slate-700 rounded-md"></div>
            </div>
            <div className="h-60 w-full bg-slate-900/50 border border-slate-700/50 rounded-lg"></div>
        </div>
    );
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