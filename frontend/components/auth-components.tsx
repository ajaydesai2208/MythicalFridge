"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

export function SignInButton() {
  return (
    <Button
      onClick={() => signIn("google")}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
      size="lg"
    >
      <LogIn className="mr-2 h-5 w-5" />
      Sign In with Google
    </Button>
  );
}

export function SignOutButton() {
  return (
    <Button
      onClick={() => signOut()}
      variant="outline"
      // THE FIX: Added default text colors for both themes.
      className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
       <LogOut className="mr-2 h-4 w-4" />
       Sign Out
    </Button>
  );
}