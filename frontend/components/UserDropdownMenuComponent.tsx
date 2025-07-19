"use client";
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
import Link from "next/link";
import { SignOutButton } from "@/components/auth-components";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";

type UserDropdownMenuComponentProps = {
  session: Session;
};

export default function UserDropdownMenuComponent({
  session,
}: UserDropdownMenuComponentProps) {
  if (!session.user) return null;

  const { name, image, email } = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
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
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}