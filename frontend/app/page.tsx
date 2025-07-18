import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, UtensilsCrossed } from "lucide-react";
import { SignInButton, SignOutButton } from "@/components/auth-components";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white p-8">
      <div className="text-center space-y-6 max-w-2xl mx-auto">
        <div className="flex justify-center items-center">
          <UtensilsCrossed className="w-16 h-16 text-emerald-400" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
          Mythical Fridge
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Tell us what's in your fridge, and we'll conjure up magical recipes to vanquish your food waste and conquer your hunger.
        </p>
        <div className="pt-4">
          {session ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                <Link href="/ingredients">Enter Your Fridge</Link>
              </Button>
              <SignOutButton />
            </div>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
      <footer className="absolute bottom-4 text-xs text-gray-500">
        <p>&copy; 2024 Ajay Desai. All rights reserved.</p>
      </footer>
    </main>
  );
}