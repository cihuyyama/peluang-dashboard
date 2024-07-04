"use client"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { DataTable } from './data-table'
import { bannerColumn } from './columns'
import { BASE_URL } from '@/types/BaseURL'
import { Banner } from '@/types/banner'

const BannerPage = () => {
    const [data, setData] = React.useState<Banner[]>([])
    React.useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/v1/banner`, {
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
                Banner Data
            </h2>
            <div className="flex flex-col mx-auto gap-8">
                <DataTable columns={bannerColumn} data={data} />
            </div>
        </ScrollArea>
    )
}

export default BannerPage