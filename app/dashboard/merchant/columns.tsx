import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Merchant } from "@/types/merchant"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { BASE_URL } from "@/types/BaseURL"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export const merchantColumn: ColumnDef<Merchant>[] = [
  {
    header: "No.",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>
    }
  },
  {
    accessorKey: "img_url",
    header: "pfp",
    cell: ({ row }) => {
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
  {
    id: "actions",
    cell: ({ row }) => {
      const merchant = row.original
      const formSchema = z.object({
        name: z.string().min(1).max(100),
        desc: z.string().min(1).max(300),
        category: z.string().min(1).max(50),
        business_model: z.string().min(1).max(50),
      })

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: merchant.name,
          desc: merchant.desc,
          category: merchant.category,
          business_model: merchant.business_model,
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
          toast.promise(
            fetch(`${BASE_URL}/v1/merchant/${merchant.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookieValue}`,
              },
              body: JSON.stringify(values),
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

      const onClickDelete = () => {
        try {
          const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
          toast.promise(
            fetch(`${BASE_URL}/v1/merchant/${merchant.id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookieValue}`,
              },
            }),
            {
              loading: "Deleting...",
              success: () => {
                setTimeout(() => {
                  location.reload();
                }, 300);
                return "Deleted Successfully";
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
      return (
        <Dialog>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    Edit Merchant
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger>
                  <DropdownMenuItem>
                    Delete Merchant
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                {/* <DropdownMenuItem>
                  Update Photo
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  and remove data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={onClickDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Merchant</DialogTitle>
              <DialogDescription>
                Add a new Merchant to the database
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Merchant Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={merchant.category}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Merchant Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Food & Beverages">Food & Beverages</SelectItem>
                          <SelectItem value="Beauty/Self Care">Beauty/Self Care</SelectItem>
                          <SelectItem value="Automotive">Automotive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="business_model"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Merchant Business Model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Autopilot">Autopilot</SelectItem>
                          <SelectItem value="Self Manage">Self Manage</SelectItem>
                          <SelectItem value="Autopilot & Self Manage">Autopilot & Self Manage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )
    }
  }
]