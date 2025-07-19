import { auth } from "@/auth";
import { getIngredients } from "@/app/actions/ingredients";
import RecipesClient from "@/components/RecipesClient";
import { redirect } from "next/navigation";
import { UtensilsCrossed, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RecipesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const ingredients = await getIngredients(session.user.email);

  if (!ingredients || ingredients.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
        <h2 className="mt-4 text-2xl font-semibold">Your Fridge is Empty!</h2>
        <p className="mt-2 text-muted-foreground">
          You need to add ingredients to your fridge before we can generate recipes.
        </p>
        {/* THE FIX: Wrap the Button with the Link, remove asChild */}
        <Link href="/ingredients">
            <Button className="mt-6">Add Ingredients</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <UtensilsCrossed className="w-12 h-12 text-emerald-400 mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter">Generate Recipes</h1>
        <p className="max-w-xl mt-2 text-muted-foreground">
          Select your dietary preferences below and let us conjure some mythical recipes for you.
        </p>
      </div>
      <RecipesClient initialIngredients={ingredients} />
    </div>
  );
}