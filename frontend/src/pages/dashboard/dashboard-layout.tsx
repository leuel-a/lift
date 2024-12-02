import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

// components
import { Outlet, Navigate } from 'react-router-dom'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardLayout() {
  const { toast } = useToast()
  const { user, isError, isLoading } = useAuth()

  if (isError || (!isLoading && !user)) {
    toast({ description: 'You must log in to access the dashboard', variant: 'destructive' })
    return <Navigate to="/" />
  }

  if (isLoading) {
    return <div>Loading...</div>
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
