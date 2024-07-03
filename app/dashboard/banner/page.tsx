import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

const BannerPage = () => {
    return (
        <ScrollArea className="w-full px-10 mx-auto py-10 h-screen ">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Banner Data
            </h2>
            <div className="flex flex-col mx-auto gap-8">
                {/* <DataTable columns={merchantColumn} data={data} /> */}
            </div>
        </ScrollArea>
    )
}

export default BannerPage