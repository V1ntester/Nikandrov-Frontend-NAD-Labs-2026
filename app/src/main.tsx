import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SmrDetailsPage from './pages/SmrDetailsPage.tsx';
import SmrGridPage from './pages/SmrGridPage.tsx';
import './styles/style.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SmrGridPage/>
  },
  {
    path: '/smr/:id',
    element: <SmrDetailsPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
