"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

type UserDropdownMenuComponentProps = {
  session: Session;
};

export default function UserDropdownMenuComponent({
  session,
}: UserDropdownMenuComponentProps) {
  const router = useRouter();
  if (!session.user) return null;

  const { name, image, email } = session.user;

  return (
    <DropdownMenu>
      {/* THE FIX IS HERE: The 'asChild' prop has been removed. */}
      <DropdownMenuTrigger className="rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background">
        <Avatar>
          <AvatarImage src={image ?? ""} alt={name ?? ""} />
          <AvatarFallback>{name ? name.charAt(0).toUpperCase() : "?"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-900 border-slate-700">
        <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push('/dashboard')} className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => router.push('/profile')} className="cursor-pointer">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}