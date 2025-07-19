import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { auth } from "@/auth";
import UserDropdownMenuComponent from "./UserDropdownMenuComponent";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton } from "./auth-components";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="w-8 h-8 text-emerald-400 group-hover:animate-pulse" />
          <span className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
            Mythical Fridge
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/ingredients">My Fridge</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/recipes">Get Recipes</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/favorites">Favorites</Link>
              </Button>
              <UserDropdownMenuComponent session={session} />
            </>
          ) : (
            <SignInButton />
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}