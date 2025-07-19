import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { auth } from "@/auth";
import UserDropdownMenuComponent from "./UserDropdownMenuComponent";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton } from "./auth-components";
import ClientOnly from "./ClientOnly";

export default async function NavBar() {
  const session = await auth();

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900/80 dark:backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <UtensilsCrossed className="w-8 h-8 text-emerald-500" />
          <span className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
            Mythical Fridge
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <>
              <Button variant="ghost" asChild className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Link href="/ingredients">My Fridge</Link>
              </Button>
              <Button variant="ghost" asChild className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Link href="/recipes">Get Recipes</Link>
              </Button>
              <Button variant="ghost" asChild className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Link href="/favorites">Favorites</Link>
              </Button>
              <UserDropdownMenuComponent session={session} />
            </>
          ) : (
            <SignInButton />
          )}
          <ClientOnly>
            <ThemeToggle />
          </ClientOnly>
        </nav>
      </div>
    </header>
  );
}