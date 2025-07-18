/** Server Component: NavBar */
import * as React from "react"
import { auth } from "@/auth"
import { UserDropdownMenuComponent } from "@/components/UserDropdownMenuComponent"
import { AuthButton } from "@/components/AuthButton"
import { ThemeToggle } from "@/components/ThemeToggle";


export default async function NavBar() {
  const session = await auth()
  return (
    <header className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
      <div className="max-w-screen-xl mx-auto flex h-14 items-center px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            <a href="/" className="hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
              VirtualFridge
            </a>
          </h1>
        </div>
        {/* User menu or auth button */}
        <nav className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          {/* Add any additional navigation links here */}
          {session ? (
            <UserDropdownMenuComponent
              name={session.user?.name}
              email={session.user?.email}
              image={session.user?.image}
            />
          ) : (
            <AuthButton type="signin" className="bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-1" />
          )}
        </nav>
      </div>
    </header>
  )
}
