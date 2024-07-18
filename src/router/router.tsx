import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import {
  LOGIN_PATH,
  DEFAULTLAYOUT_PATH,
  PROJECTS_PATH_EXAMPLE,
  VENDORS_PATH,
  ZONES_PATH,
  MARKERS_PATH,
  DELIVERIES_PATH,
  ADMIN_PATH,
  ZONES_CONTENT_PATH,
  MAIN_PATH,
  DIFFERENCETYPE_PATH
} from '@/router/routerPaths.ts'
import NewDeliveryProvider from '@/contexts/NewDelivery'

const Home = lazy(() => import('@/pages/main/Home.tsx'))
const Projects = lazy(() => import('@/pages/main/Projects.tsx'))
const Login = lazy(() => import('@/pages/Login.tsx'))
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout.tsx'))
const Vendors = lazy(() => import('@/pages/admin/Vendors.tsx'))
const Zones = lazy(() => import('@/pages/admin/Zones.tsx'))
const Markers = lazy(() => import('@/pages/admin/Markers.tsx'))
const Deliveries = lazy(() => import('@/pages/main/Deliveries'))
const ZonesContent = lazy(() => import('@/pages/main/ZonesContent'))
const DifferenceType = lazy(() => import('@/pages/admin/DifferenceType'))

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
      element: <DefaultLayout />
    },
    {
      path: ADMIN_PATH,
      element: <DefaultLayout />,
      children: [
        {
          path: VENDORS_PATH,
          element: <Vendors />
        },
        {
          path: ZONES_PATH,
          element: <Zones />
        },
        {
          path: MARKERS_PATH,
          element: <Markers />
        },
        {
          path: DIFFERENCETYPE_PATH,
          element: <DifferenceType />
        }
      ]
    },
    {
      path: MAIN_PATH,
      element: <DefaultLayout />,
      children: [
        {
          path: ZONES_CONTENT_PATH,
          element: <ZonesContent />
        },
        {
          path: DELIVERIES_PATH,
          element: (
            <NewDeliveryProvider>
              <Deliveries />
            </NewDeliveryProvider>
          )
        }
      ]
    }
  ])
}
