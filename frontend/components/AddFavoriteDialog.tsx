"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/toast";

interface AddFavoriteDialogProps {
  recipeId: number;
  email: string;
}

export function AddFavoriteDialog({
  recipeId,
  email,
}: AddFavoriteDialogProps) {
  const [loading, setLoading] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastVariant, setToastVariant] =
    React.useState<"success" | "error">("success");

  async function handleFavorite() {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/add?email=${encodeURIComponent(
          email
        )}&recipeId=${recipeId}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
      <Button
        variant="outline"
        size="xs"
        onClick={handleFavorite}
        disabled={loading}
      >
        {loading ? "…" : "Favorite"}
      </Button>

      {toastOpen && (
        <Toast
          open={toastOpen}
          variant={toastVariant}
          onOpenChange={setToastOpen}
        >
          <ToastTitle>
            {toastVariant === "success"
              ? "Favorited!"
              : "Error"}
          </ToastTitle>
          <ToastDescription>
            {toastVariant === "success"
              ? "Added to your favorites."
              : "Could not add favorite."}
          </ToastDescription>
          <ToastClose />
        </Toast>
      )}
    </>
  );
}

AddFavoriteDialog.displayName = "AddFavoriteDialog";
