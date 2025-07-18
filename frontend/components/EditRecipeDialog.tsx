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
import { Toast, ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

export type EditRecipeDialogProps = {
  recipe: {
    id: number;
    name: string;
    ingredients: string[];
  };
};

export function EditRecipeDialog({ recipe }: EditRecipeDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(recipe.name);
  const [ingredients, setIngredients] = React.useState(recipe.ingredients.join(", "));
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] = React.useState<'success' | 'error'>('success');
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes/${recipe.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, ingredients: ingredients.split(',').map(i => i.trim()) })
        }
      );
      if (!res.ok) throw new Error();
      setOpen(false);
      router.refresh();
      setToastVariant('success');
    } catch {
      setToastVariant('error');
    } finally {
      setLoading(false);
      setToastOpen(true);
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
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>Update recipe details below.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Recipe Name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Ingredients (comma separated)"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
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
          <ToastTitle>
            {toastVariant === 'success' ? 'Recipe updated!' : 'Error'}
          </ToastTitle>
          <ToastDescription>
            {toastVariant === 'success'
              ? 'The recipe was updated successfully.'
              : 'Failed to update recipe.'}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}
EditRecipeDialog.displayName = 'EditRecipeDialog';
