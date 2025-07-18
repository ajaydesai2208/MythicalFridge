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
import { Pagination } from "@/components/Pagination";
import { CookRecipeDialog } from "@/components/CookRecipeDialog";
import { AddFavoriteDialog } from "@/components/AddFavoriteDialog";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
}

interface RecipesTableProps {
  recipes: Recipe[];
  email: string;
}

export const RecipesTable: React.FC<RecipesTableProps> = ({
  recipes,
  email,
}) => {
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    const q = filter.toLowerCase();
    return recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.ingredients.join(", ").toLowerCase().includes(q)
    );
  }, [filter, recipes]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="w-full">
      <Input
        placeholder="Search recipes…"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1);
        }}
        className="mb-4 max-w-md"
      />

      <Table>
        <TableHeader>
          <tr>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead>Actions</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {paged.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.id}</TableCell>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.ingredients.join(", ")}</TableCell>
              <TableCell className="flex gap-2">
                <CookRecipeDialog recipeId={r.id} email={email} />
                <AddFavoriteDialog recipeId={r.id} email={email} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

RecipesTable.displayName = "RecipesTable";
