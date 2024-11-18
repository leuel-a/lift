import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Providers from './providers.tsx'
import { Toaster } from '@/components/ui/toaster'

import LockersPage from './pages/dashboard/lockers.tsx'
import MembersPage from './pages/dashboard/members/page.tsx'
import AddMemberPage from './pages/dashboard/members/add/page.tsx'
import DashboardLayout from './pages/dashboard/dashboard-layout.tsx'

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
