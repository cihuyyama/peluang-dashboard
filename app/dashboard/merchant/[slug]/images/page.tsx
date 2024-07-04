"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import { BASE_URL } from '@/types/BaseURL'
import { Merchant } from '@/types/merchant'
import React, { useEffect } from 'react'
import { DataTable } from './data-table'
import { merchantImageColumn } from './columns'

const MerchantImagePage = ({ params }: { params: { slug: string } }) => {
    const [data, setData] = React.useState<Merchant>({
        id: '',
        name: '',
        slug: '',
        desc: '',
        category: '',
        business_model: '',
        img_url: '',
        images: [],
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/v1/merchant/${params.slug}`, {
                    method: 'GET',
                })
                const data = await response.json()
                setData(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [params.slug])
    return (
        <ScrollArea className="w-full px-10 mx-auto py-10 h-screen ">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {data.name} Images Data
            </h2>
            <div className="flex flex-col mx-auto gap-8">
                <DataTable columns={merchantImageColumn} data={data.images} id={data.id} />
            </div>
        </ScrollArea>
    )
}

export default MerchantImagePage