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
import { EditIngredientDialog } from "@/components/EditIngredientDialog";
import { DeleteIngredientDialog } from "@/components/DeleteIngredientDialog";
import { Pagination } from "@/components/Pagination";

type Ingredient = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
};

interface IngredientsTableProps {
  ingredients: Ingredient[];
  email: string;
}

export const IngredientsTable: React.FC<IngredientsTableProps> = ({
  ingredients,
  email,
}) => {
  const [filter, setFilter] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    const lower = filter.toLowerCase();
    return ingredients.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.unit.toLowerCase().includes(lower)
    );
  }, [filter, ingredients]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedIngredients = React.useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <div className="w-full">
      <Input
        placeholder="Search ingredients..."
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
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Actions</TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {pagedIngredients.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell className="flex gap-2">
                <EditIngredientDialog ingredient={item} email={email} />
                <DeleteIngredientDialog ingredientId={item.id} email={email} />
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

IngredientsTable.displayName = "IngredientsTable";
