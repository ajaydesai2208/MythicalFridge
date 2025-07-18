import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import FavoritesClient from "@/components/FavoritesClient";
import { getFavoriteRecipes } from "../actions/favorites";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function FavoritesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const favoriteRecipes = await getFavoriteRecipes(session.user.email);

  // Handle the case where there are no favorites
  if (!favoriteRecipes || favoriteRecipes.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <Heart className="mx-auto h-12 w-12 text-pink-400" />
        <h2 className="mt-4 text-2xl font-semibold">No Favorites Yet</h2>
        <p className="mt-2 text-muted-foreground">
          You haven&apos;t saved any favorite recipes. Go find some you love!
        </p>
        <Button asChild className="mt-6">
          <Link href="/recipes">Generate Recipes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <Heart className="w-12 h-12 text-pink-400 mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter">My Favorite Recipes</h1>
        <p className="max-w-xl mt-2 text-muted-foreground">
          Here are all the magical recipes you&apos;ve saved for later.
        </p>
      </div>
      <FavoritesClient recipes={favoriteRecipes} />
    </div>
  );
}