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
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toastVariants,
  ToastViewport
} from "@/components/ui/toast";

export function AddRecipeDialog() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [instructions, setInstructions] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            ingredients: ingredients.split(",").map((i) => i.trim()),
            instructions
          })
        }
      );
      if (!res.ok) throw new Error("Failed to save recipe");
      setOpen(false);
      router.refresh();
      // Show success toast
      Toast({
        variant: 'success',
        title: 'Recipe added!',
        description: 'Your recipe was saved successfully.'
      });
    } catch {
      // Show error toast
      Toast({
        variant: 'error',
        title: 'Error',
        description: 'Unable to save recipe.'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">Add Recipe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Recipe</DialogTitle>
          <DialogDescription>Fill in recipe details below.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            disabled={loading}
          />
          <Input
            placeholder="Instructions"
            className="h-24"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            disabled={loading}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="default" size="sm" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
        <DialogClose asChild>
          <button className="sr-only">Close</button>
        </DialogClose>
      </DialogContent>
      <ToastViewport />
    </Dialog>
  );
}
