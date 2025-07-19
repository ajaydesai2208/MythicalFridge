"use client"; // <-- Make this a client component

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // <-- Import hooks
import { UtensilsCrossed } from "lucide-react";
import { useSession } from "next-auth/react"; // <-- Use the client-side session hook
import UserDropdownMenuComponent from "./UserDropdownMenuComponent";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { SignInButton } from "./auth-components";
import ClientOnly from "./ClientOnly";

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Render a loading skeleton while the session is being determined
  if (status === "loading") {
    return (
        <header className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
            <div className="container mx-auto flex items-center justify-between gap-4 animate-pulse">
                <div className="h-8 w-48 bg-slate-700 rounded-md"></div>
                <div className="h-10 w-24 bg-slate-700 rounded-md"></div>
            </div>
        </header>
    );
  }

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
              {/* THE FIX: Use onClick for navigation, completely removing asChild */}
              <Button variant={pathname === "/ingredients" ? "secondary" : "ghost"} onClick={() => router.push('/ingredients')} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                My Fridge
              </Button>
              <Button variant={pathname === "/recipes" ? "secondary" : "ghost"} onClick={() => router.push('/recipes')} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                Get Recipes
              </Button>
              <Button variant={pathname === "/favorites" ? "secondary" : "ghost"} onClick={() => router.push('/favorites')} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800">
                Favorites
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