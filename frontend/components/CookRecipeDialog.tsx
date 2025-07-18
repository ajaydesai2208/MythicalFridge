"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

interface CookRecipeDialogProps {
  recipeId: number;
  email: string;
}

export function CookRecipeDialog({
  recipeId,
  email,
}: CookRecipeDialogProps) {
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] =
    React.useState<"success" | "error">("success");
  const router = useRouter();

  async function handleCook() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/recipes/cook/${recipeId}?email=${encodeURIComponent(
          email
        )}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setToastVariant("success");
      router.refresh();
    } catch {
      setToastVariant("error");
    } finally {
      setLoading(false);
      setToastOpen(true);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="xs"
        onClick={handleCook}
        disabled={loading}
      >
        {loading ? "Cooking…" : "Cook"}
      </Button>

      {toastOpen && (
        <Toast
          open={toastOpen}
          variant={toastVariant}
          onOpenChange={setToastOpen}
        >
          <ToastTitle>
            {toastVariant === "success" ? "Cooked!" : "Error"}
          </ToastTitle>
          <ToastDescription>
            {toastVariant === "success"
              ? "Fridge has been updated."
              : "Could not cook recipe."}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}

CookRecipeDialog.displayName = "CookRecipeDialog";
