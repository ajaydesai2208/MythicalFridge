"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AddUserDialog } from "@/components/AddUserDialog";
import { EditUserDialog } from "@/components/EditUserDialog";
import { DeleteUserDialog } from "@/components/DeleteUserDialog";
import { Pagination } from "@/components/Pagination";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminUsersTableProps {
  users: User[];
}

export const AdminUsersTable: React.FC<AdminUsersTableProps> = ({ users }) => {
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filteredUsers = React.useMemo(() => {
    const lower = filter.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        u.role.toLowerCase().includes(lower)
    );
  }, [filter, users]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const pagedUsers = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Search users..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
          className="max-w-md"
        />
        <AddUserDialog />
      </div>

      <Table>
        <TableHeader>
          <tr>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {pagedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex gap-2">
                <EditUserDialog user={user} />
                <DeleteUserDialog userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
};

AdminUsersTable.displayName = "AdminUsersTable";
