import * as React from 'react'
import { Dumbbell } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, LayoutDashboardIcon, Users2Icon, User, LogOut, Settings } from 'lucide-react'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Members',
    url: '/dashboard/members',
    icon: Users2Icon
  },
  {
    title: 'Lockers',
    url: '/dashboard/lockers',
    icon: Lock,
  },
]

const adminItems = [
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: User,
  },
]

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Sidebar className="border-l-indigo-950" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Dumbbell />
          <h1 className="font-epilogue text-xl font-medium tracking-widest text-black">Lift</h1>
        </div>
      </SidebarHeader>
      <Separator className="bg-indigo-950" />
      <SidebarContent className="mt-4">
        {items.map(item => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
        {/* Admin Menu Group */}
        {user && user.role === 'admin' && (
          <SidebarGroup className="mt-8">
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent className="mt-2">
              {adminItems.map(item => (
                <SidebarMenu key={item.title}>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <Separator className="bg-indigo-950" />
      <SidebarFooter className="mb-8">
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <Link to="/dashboard/settings">
              <Settings />
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
        <SidebarMenu>
          {/*TODO: use the same logic in next-auth to abstract the logout functionality to a hook (the useAuth hook)*/}
          <SidebarMenuButton
            onClick={() => {
              localStorage.removeItem('accessToken')
              localStorage.removeItem('refreshToken')

              return navigate('/')
            }}
          >
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
