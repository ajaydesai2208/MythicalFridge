"use client"

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastTitle, ToastDescription, ToastClose, Toast } from "@/components/ui/toast";

// Props for editing a user
export type EditUserDialogProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
};

export function EditUserDialog({ user }: EditUserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [role, setRole] = React.useState(user.role);
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] = React.useState<'success' | 'error'>('success');
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, role })
        }
      );
      if (!res.ok) throw new Error();
      setOpen(false);
      router.refresh();
      setToastVariant('success');
      setToastOpen(true);
    } catch {
      setToastVariant('error');
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="xs">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user details below.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
          <DialogClose asChild>
            <button className="sr-only">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {toastOpen && (
        <Toast open={toastOpen} variant={toastVariant} onOpenChange={setToastOpen}>
          <ToastTitle>{toastVariant === 'success' ? 'User updated!' : 'Error'}</ToastTitle>
          <ToastDescription>
            {toastVariant === 'success'
              ? 'User details saved.'
              : 'Failed to update user.'}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}
EditUserDialog.displayName = 'EditUserDialog';
