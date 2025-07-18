"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Flame } from "lucide-react";

// Re-defining types here for clarity within the component
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

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Dialog>
      <Card className="flex flex-col h-full bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-emerald-400">{recipe.title}</CardTitle>
          <CardDescription className="text-slate-400">{recipe.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="w-4 h-4 text-red-500" />
            <span>{recipe.nutritionalInfo.calories}</span>
          </div>
        </CardContent>
        <CardFooter>
          <DialogTrigger asChild>
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">View Recipe</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-2xl bg-slate-900 border-slate-700">
        <ScrollArea className="h-[80vh] pr-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold tracking-tight text-emerald-400">{recipe.title}</DialogTitle>
            <DialogDescription className="text-slate-400 pt-2">{recipe.description}</DialogDescription>
          </DialogHeader>

          <Separator className="my-4 bg-slate-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">Ingredients</h3>
              <ul className="space-y-1 text-slate-300 list-disc pl-5">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index}>
                    {ing.name} ({ing.quantity})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">Nutritional Info</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-slate-300"><strong>Calories:</strong> {recipe.nutritionalInfo.calories}</p>
                <p className="text-slate-300"><strong>Protein:</strong> {recipe.nutritionalInfo.protein}</p>
                <p className="text-slate-300"><strong>Fat:</strong> {recipe.nutritionalInfo.fat}</p>
                <p className="text-slate-300"><strong>Carbs:</strong> {recipe.nutritionalInfo.carbohydrates}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4 bg-slate-700" />

          <div>
            <h3 className="font-semibold text-lg text-white mb-2">Instructions</h3>
            <div className="prose prose-sm prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
              {recipe.instructions}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function RecipeCardSkeleton() {
    return (
      <Card className="flex flex-col h-full bg-slate-900/50 border-slate-700/50 animate-pulse">
        <CardHeader>
          <div className="h-6 w-3/4 bg-slate-700 rounded"></div>
          <div className="h-4 w-full mt-2 bg-slate-700 rounded"></div>
          <div className="h-4 w-1/2 mt-1 bg-slate-700 rounded"></div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="h-5 w-1/4 bg-slate-700 rounded"></div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled>Loading...</Button>
        </CardFooter>
      </Card>
    );
  }