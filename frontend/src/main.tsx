import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Providers from './providers.tsx'
import { Toaster } from '@/components/ui/toaster'

// dashboard pages
import DashboardHome from './pages/dashboard/home/page.tsx'
import LockersPage from './pages/dashboard/lockers/page.tsx'
import MembersPage from './pages/dashboard/members/page.tsx'
import AddMemberPage from './pages/dashboard/members/add/page.tsx'
import AddUserPage from './pages/dashboard/[admin]/users/add/page'
import UsersPage from './pages/dashboard/[admin]/users/page.tsx'
import DashboardLayout from './pages/dashboard/dashboard-layout.tsx'
import SettingsPage from '@/pages/dashboard/settings/page.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'lockers',
        element: <LockersPage />,
      },
      {
        path: 'members',
        element: <MembersPage />,
      },
      {
        path: 'members/add',
        element: <AddMemberPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'users/add',
        element: <AddUserPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  </StrictMode>,
)
