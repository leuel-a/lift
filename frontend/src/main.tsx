import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Providers from './providers.tsx'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from './pages/dashboard/dashboard-layout.tsx'
import Lockers from './pages/dashboard/lockers.tsx'
import Members from './pages/dashboard/members/members.tsx'

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
        element: <Lockers />,
      },
      {
        path: 'members',
        element: <Members />,
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
