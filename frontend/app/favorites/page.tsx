"use server"

import * as React from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ToastProvider, ToastViewport } from "@/components/ui/toast"

// Define Favorite type (adjust fields as needed)
interface Favorite {
  id: number
  name: string
}

// Fetch favorites from the backend
async function fetchFavorites(): Promise<Favorite[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/favorites`,
    { cache: 'no-store' }
  )
  if (!res.ok) throw new Error('Failed to fetch favorites')
  return res.json()
}

export default async function FavoritesPage() {
  const favorites = await fetchFavorites()

  return (
    <div className="container mx-auto p-4">
      <ToastProvider>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Favorites</h2>
          {/* Additional controls (e.g., Add Favorite) can go here */}
        </div>

        <Table>
          <TableHeader>
            <tr>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {favorites.map((fav) => (
              <TableRow key={fav.id}>
                <TableCell>{fav.id}</TableCell>
                <TableCell>{fav.name}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="destructive" size="xs">Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ToastViewport />
      </ToastProvider>
    </div>
  )
}
