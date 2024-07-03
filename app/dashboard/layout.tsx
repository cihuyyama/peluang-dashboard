"use client"
import SideBarList from "@/components/SideBarList"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-row">
            <div className="w-fit h-full">
                <SideBarList />
            </div>
            {children}
        </section>
    )
}