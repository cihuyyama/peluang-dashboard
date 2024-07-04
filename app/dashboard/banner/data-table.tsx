"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "sonner"
import { BASE_URL } from "@/types/BaseURL"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        }
    })

    const [file, setFile] = useState<any>()
    const [preview, setPreview] = useState<string | null>(null);
    const onSubmitEvent = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const cookieValue = document.cookie.split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
            toast.promise(
                fetch(`${BASE_URL}/v1/banner`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${cookieValue}`,
                    },
                    body: formData,
                }),
                {
                    loading: "Saving...",
                    success: () => {
                        setTimeout(() => {
                            location.reload();
                        }, 300);
                        return "Saved Successfully";
                    },
                    error: (data: string) => {
                        console.log(data)
                        return `Failed - ${data.split(' ')[3]}`;
                    },
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        const selectedFile = files[0];
        console.log(selectedFile);
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
    }

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex items-center py-4 pl-1">
                    <Input
                        placeholder="Search Merchant Name"
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="w-[400px]"
                    />
                </div>
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={"default"}>
                                <Plus />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Banner</DialogTitle>
                                <DialogDescription>
                                    Add banner to the database
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={onSubmitEvent}>
                                <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" onChange={e => handleChange(e)} type="file" accept="image/*" />
                                {preview && (
                                    <div className="mt-2 flex justify-center">
                                        <Image
                                            src={preview}
                                            alt="Selected preview"
                                            className="w-full h-full object-cover rounded-md"
                                            width={1190}
                                            height={720}
                                        />
                                    </div>
                                )}
                                <Button type="submit" className="mt-4">
                                    Upload
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
