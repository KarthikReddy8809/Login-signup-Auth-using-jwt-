import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router';
import { createRouter } from '@tanstack/react-router';
import { Toaster } from "@/components/ui/toaster"
import { routeTree } from './routeTree.gen.ts'
const  router  = createRouter({routeTree})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <RouterProvider router={router} />
        <Toaster />
  </StrictMode>,
)
