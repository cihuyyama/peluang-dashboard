"use client"

import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect } from 'react'
import { DataTable } from './data-table'
import { merchantColumn } from './columns'
import { BASE_URL } from '@/types/BaseURL'
import { Merchant } from '@/types/merchant'

const MerchantPage = () => {
    const [data, setData] = React.useState<Merchant[]>([])
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/v1/merchant`, {
                    method: 'GET',
                })
                const data = await response.json()
                setData(data.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

    return (
        <ScrollArea className="w-full px-10 mx-auto py-10 h-screen ">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Merchant Data
            </h2>
            <div className="flex flex-col mx-auto gap-8">
                <DataTable columns={merchantColumn} data={data} />
            </div>
        </ScrollArea>
    )
}

export default MerchantPage