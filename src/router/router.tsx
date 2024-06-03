import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import {
  LOGIN_PATH,
  DEFAULTLAYOUT_PATH,
  PROJECTS_PATH_EXAMPLE,
  VENDORS_PATH,
  ZONES_PATH
} from '@/router/routerPaths.ts'

const Home = lazy(() => import('@/pages/Home.tsx'))
const Projects = lazy(() => import('@/pages/Projects.tsx'))
const Login = lazy(() => import('@/pages/Login.tsx'))
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout.tsx'))
const Vendors = lazy(() => import('@/pages/Vendors.tsx'))
const Zones = lazy(() => import('@/pages/Zones.tsx'))

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: PROJECTS_PATH_EXAMPLE,
      element: <Projects />
    },
    {
      path: LOGIN_PATH,
      element: <Login />
    },
    {
      path: DEFAULTLAYOUT_PATH,
      element: <DefaultLayout />,
      children: [
        {
          path: VENDORS_PATH,
          element: <Vendors />
        },
        {
          path: ZONES_PATH,
          element: <Zones />
        }
      ]
    }
  ])
}
