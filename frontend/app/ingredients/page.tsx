import { auth } from "@/auth";
import { getIngredients } from "@/app/actions/ingredients";
import { redirect } from "next/navigation";
import { Refrigerator } from "lucide-react";
import IngredientsClient from "@/components/IngredientsClient";

export default async function IngredientsPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/");
  }

  const ingredients = await getIngredients(session.user.email);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center text-center mb-12">
        <Refrigerator className="w-12 h-12 text-cyan-400 mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter">My Fridge</h1>
        <p className="max-w-xl mt-2 text-muted-foreground">
          Here are the ingredients you currently have on hand. Add or remove items to get the best recipe recommendations.
        </p>
      </div>

      <IngredientsClient initialIngredients={ingredients} />
    </div>
  );
}