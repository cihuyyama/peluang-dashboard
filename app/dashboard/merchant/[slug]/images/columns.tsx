import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BASE_URL } from "@/types/BaseURL";
import { Banner } from "@/types/banner";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { toast } from "sonner";
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
import { Trash, Trash2 } from "lucide-react";
import { MerchantImage } from "@/types/merchant";

export const merchantImageColumn: ColumnDef<MerchantImage>[] = [
    {
        header: "No.",
        cell: ({ row }) => {
            return <span>{row.index + 1}</span>
        }
    },
    {
        accessorKey: "img_url",
        header: "Banner",
        cell: ({ row }) => {
            const image = row.original
            return (
                <Image
                    unoptimized
                    src={image.img_url}
                    alt="merchant image"
                    width={40}
                    height={40}
                    className="w-60 h-60 object-cover rounded-md"
                />
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const image = row.original

            const onClickDelete = () => {
                try {
                    const cookieValue = document.cookie.split('; ')
                        .find(row => row.startsWith('token='))
                        ?.split('=')[1];
                    toast.promise(
                        fetch(`${BASE_URL}/v1/merchant/${image.merchant_id}/images/${image.id}`, {
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
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Trash2 />
                    </AlertDialogTrigger>

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

            )
        }
    }
]