import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export type Merchant = {
    id: string
    name: string
    desc: string
    category: string
    business_model: string
    img_url: string
}

export const merchantColumn: ColumnDef<Merchant>[] = [
    {
      accessorKey: "img_url",
      header: "pfp",
      cell: ({row}) => {
        const merchant = row.original
        return (
          <Image
            src={merchant.img_url}
            alt={merchant.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
        )
      }
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "desc",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "business_model",
      header: "Business Model",
    },
  ]