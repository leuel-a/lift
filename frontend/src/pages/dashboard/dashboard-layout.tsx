import { useAuth } from '@/hooks/use-auth'

// components
import { Outlet, Navigate } from 'react-router-dom'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout() {
  const { user, isError, isLoading } = useAuth()

  if (isError || (!isLoading && !user)) {
    return <Navigate to="/" />
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-indigo-600"></div>
      </div>
    )
  }

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
