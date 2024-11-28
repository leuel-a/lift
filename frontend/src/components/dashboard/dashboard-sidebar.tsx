import * as React from 'react'
import { Dumbbell } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { Lock, LayoutDashboardIcon, Users2Icon } from 'lucide-react'

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

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
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
          <SidebarMenu>
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
      </SidebarContent>
    </Sidebar>
  )
}
