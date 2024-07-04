import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, FileClock, FlaskConical, HomeIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

function SideBarList() {
    const pathname = usePathname()
    const firstPath = pathname.split('/')[1]
    const lastPath = pathname.split('/')[2]

    return (
        <Sidebar>
            <SidebarItem active={firstPath==='diseases'} icon={<HomeIcon />} link="/dashboard" text="Home" />
            <SidebarItem active={firstPath==='endemics'} icon={<BarChartIcon />} link="/dashboard/merchant" text="Merchant" />
            <SidebarItem active={firstPath==='symptoms'} icon={<FlaskConical />} link="/dashboard/banner" text="Banner" />
        </Sidebar>
    )
}

export default SideBarList