"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Flame, Heart } from "lucide-react";
import { toggleFavoriteStatus } from "@/app/actions/favorites";
import { useToast } from "@/components/ui/use-toast";

// Define the types for clarity
interface RecipeIngredient {
  name: string;
  quantity: string;
}

interface Instruction {
  id: number;
  step: string;
}

interface NutritionalInfo {
  calories?: string;
  protein?: string;
  fat?: string;
  carbohydrates?: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: Instruction[];
  ingredients: RecipeIngredient[];
  nutritionalInfo?: NutritionalInfo;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false); // We can expand on this later if needed

  const handleFavoriteClick = async () => {
    if (!session?.user?.email || !recipe.id) return;
    
    const result = await toggleFavoriteStatus(session.user.email, recipe.id);
    
    if (result.success) {
      toast({
        title: "Success!",
        description: "Your favorites have been updated.",
      });
    } else {
      toast({
        title: "Uh oh!",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const {
    title = "Untitled Recipe",
    description = "No description available.",
    instructions = [],
    ingredients = [],
    nutritionalInfo,
  } = recipe || {};

  return (
    <Dialog>
      <Card className="flex flex-col h-full bg-slate-900/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-emerald-400">{title}</CardTitle>
          <CardDescription className="text-slate-400">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          {nutritionalInfo?.calories && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Flame className="w-4 h-4 text-red-500" />
              <span>{nutritionalInfo.calories}</span>
            </div>
          )}
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
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-3xl font-bold tracking-tight text-emerald-400">{title}</DialogTitle>
                <DialogDescription className="text-slate-400 pt-2">{description}</DialogDescription>
              </div>
              <Button size="icon" variant="ghost" onClick={handleFavoriteClick} aria-label="Favorite recipe">
                <Heart className="w-6 h-6 text-pink-500 hover:fill-current" />
              </Button>
            </div>
          </DialogHeader>

          <Separator className="my-4 bg-slate-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">Ingredients</h3>
              <ul className="space-y-1 text-slate-300 list-disc pl-5">
                {ingredients.map((ing, index) => (
                  <li key={index}>
                    {ing.name} ({ing.quantity})
                  </li>
                ))}
              </ul>
            </div>
            {nutritionalInfo && (
              <div>
                <h3 className="font-semibold text-lg text-white mb-2">Nutritional Info</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-slate-300"><strong>Calories:</strong> {nutritionalInfo.calories || 'N/A'}</p>
                  <p className="text-slate-300"><strong>Protein:</strong> {nutritionalInfo.protein || 'N/A'}</p>
                  <p className="text-slate-300"><strong>Fat:</strong> {nutritionalInfo.fat || 'N/A'}</p>
                  <p className="text-slate-300"><strong>Carbs:</strong> {nutritionalInfo.carbohydrates || 'N/A'}</p>
                </div>
              </div>
            )}
          </div>

          <Separator className="my-4 bg-slate-700" />

          <div>
            <h3 className="font-semibold text-lg text-white mb-2">Instructions</h3>
            <ol className="prose prose-sm prose-invert max-w-none text-slate-300 list-decimal pl-5 space-y-2">
              {instructions.map((instruction) => (
                <li key={instruction.id}>{instruction.step}</li>
              ))}
            </ol>
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