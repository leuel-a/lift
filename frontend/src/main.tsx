import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Providers from './providers.tsx'
import { Toaster } from '@/components/ui/toaster'
import Dashboard from './pages/dashboard/layout.tsx'
import Lockers from './pages/dashboard/lockers.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'lockers',
        element: <Lockers />,
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
