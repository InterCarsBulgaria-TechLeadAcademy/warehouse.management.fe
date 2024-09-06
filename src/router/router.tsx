import { Navigate, useRoutes } from 'react-router-dom'
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
  DIFFERENCETYPE_PATH,
  USERS_PATH,
  ROLES_PATH,
  DIFFERENCES_PATH
} from '@/router/routerPaths.ts'
import NewDeliveryProvider from '@/contexts/NewDelivery'
import { useAuth } from '@/hooks/services/auth/useAuth'

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
const ErrorPage = lazy(() => import('@/pages/ErrorPage'))
const Users = lazy(() => import('@/pages/admin/Users.tsx'))
const Roles = lazy(() => import('@/pages/admin/Roles.tsx'))
const Differences = lazy(() => import('@/pages/main/Differences.tsx'))

export default function Router() {
  const { user } = useAuth()
  // TODO: Add logic for users with roles that are not admins..

  const isAuthenticated = !!user

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
      element: isAuthenticated ? <Navigate to={DELIVERIES_PATH} /> : <Login />
    },
    {
      path: DEFAULTLAYOUT_PATH,
      // TODO: Later to discuss this path to include it in some cases or not
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />
    },
    {
      path: ADMIN_PATH,
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />,
      children: [
        {
          path: USERS_PATH,
          element: <Users />
        },
        {
          path: ROLES_PATH,
          element: <Roles />
        },
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
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />,
      children: [
        {
          path: ZONES_CONTENT_PATH,
          element: <ZonesContent />
        },
        {
          path: DIFFERENCES_PATH,
          element: <Differences />
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
    },
    { path: '*', element: <ErrorPage /> }
  ])
}
