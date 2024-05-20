import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import { PROJECTS_PATH_EXAMPLE } from '@/router/routerPaths.ts'

const Home = lazy(() => import('@/pages/Home.tsx'))
const Projects = lazy(() => import('@/pages/Projects.tsx'))

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: PROJECTS_PATH_EXAMPLE,
      element: <Projects />
    }
  ])
}
