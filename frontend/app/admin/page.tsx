// app/admin/page.tsx
import React from "react";
import { AdminUsersTable, type User } from "@/components/AdminUsersTable";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

async function fetchUsers(): Promise<User[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function AdminPage() {
  const users = await fetchUsers();

  return (
    <div className="container mx-auto p-4">
      <ToastProvider>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Admin Users</h2>
        </div>

        {/* Client‐side table (with its own Add/Edit/Delete dialogs) */}
        <AdminUsersTable users={users} />

        <ToastViewport />
      </ToastProvider>
    </div>
  );
}
