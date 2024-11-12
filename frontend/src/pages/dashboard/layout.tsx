import { Outlet } from 'react-router-dom'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

export default function Dashboard() {
  return (
    <SidebarProvider>
      <DashboardSidebar className="mt-4 pl-2" />
      <SidebarInset>
        <SidebarTrigger className="absolute -ml-1" />
        <div className="h-full px-4 py-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
