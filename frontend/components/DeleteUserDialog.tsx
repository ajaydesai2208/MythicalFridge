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
import { ToastTitle, ToastDescription, ToastClose, Toast } from "@/components/ui/toast";

export type DeleteUserDialogProps = {
  userId: number;
};

export function DeleteUserDialog({ userId }: DeleteUserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] = React.useState<'success' | 'error'>('success');
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`,
        { method: 'DELETE' }
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
          <Button variant="destructive" size="xs">Delete</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
          <DialogClose asChild>
            <button className="sr-only">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {toastOpen && (
        <Toast open={toastOpen} variant={toastVariant} onOpenChange={setToastOpen}>
          <ToastTitle>
            {toastVariant === 'success' ? 'User deleted!' : 'Error'}
          </ToastTitle>
          <ToastDescription>
            {toastVariant === 'success'
              ? 'The user has been deleted.'
              : 'Failed to delete user.'}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}
DeleteUserDialog.displayName = 'DeleteUserDialog';
