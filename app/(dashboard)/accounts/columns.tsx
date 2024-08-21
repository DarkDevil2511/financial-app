"use client"

import { InferResponseType } from "hono"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { client } from "@/lib/hono"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Actions } from "./actions"

export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0]

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: "Amount",
  // },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />
  }
]
