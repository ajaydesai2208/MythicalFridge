"use client";

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
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

type AddIngredientDialogProps = {
  email: string;
};

export function AddIngredientDialog({ email }: AddIngredientDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] = React.useState<
    "success" | "error"
  >("success");
  const router = useRouter();

  async function handleSave() {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ingredients/add?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            quantity: Number(quantity),
            unit,
          }),
        }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setOpen(false);
      router.refresh();
      setToastVariant("success");
    } catch {
      setToastVariant("error");
    } finally {
      setLoading(false);
      setToastOpen(true);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="sm">
            Add Ingredient
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Ingredient</DialogTitle>
            <DialogDescription>
              Provide details for the new ingredient.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled={loading}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
          <DialogClose asChild>
            <button className="sr-only">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {toastOpen && (
        <Toast
          open={toastOpen}
          variant={toastVariant}
          onOpenChange={setToastOpen}
        >
          <ToastTitle>
            {toastVariant === "success"
              ? "Ingredient added!"
              : "Error"}
          </ToastTitle>
          <ToastDescription>
            {toastVariant === "success"
              ? "Your ingredient was saved."
              : "Failed to add ingredient."}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}
AddIngredientDialog.displayName = "AddIngredientDialog";
