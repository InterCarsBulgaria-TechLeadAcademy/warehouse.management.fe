import { Navigate, useRoutes } from 'react-router-dom'
import { lazy } from 'react'
import {
  LOGIN_PATH,
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
  DIFFERENCES_PATH,
  HOME_PATH
} from '@/router/routerPaths.ts'
import NewDeliveryProvider from '@/contexts/NewDelivery'
import { useAuth } from '@/hooks/services/auth/useAuth'
import { RouterPagePermissionsWrapper } from '@/wrappers/RouterPagePermissionsWrapper.tsx'
import {
  Difference,
  Entry,
  Marker,
  Role,
  User,
  Vendor,
  Zone,
  DifferenceType as DifferenceTypePermissions,
  Delivery
} from '@/types/Permissions.ts'

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
  const isAuthenticated = !!user

  const getNavigateTo = (path: string) => {
    return isAuthenticated ? path : LOGIN_PATH
  }

  return useRoutes([
    {
      path: HOME_PATH,
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />
    },
    {
      path: LOGIN_PATH,
      element: isAuthenticated ? <Navigate to={HOME_PATH} /> : <Login />
    },
    {
      path: ADMIN_PATH,
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />,
      children: [
        {
          path: USERS_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={User.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Users />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: ROLES_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Role.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Roles />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: VENDORS_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Vendor.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Vendors />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: ZONES_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Zone.GetAll}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Zones />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: MARKERS_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Marker.GetAll}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Markers />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: DIFFERENCETYPE_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={DifferenceTypePermissions.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <DifferenceType />
            </RouterPagePermissionsWrapper>
          )
        }
      ]
    },
    {
      path: MAIN_PATH,
      element: isAuthenticated ? <DefaultLayout /> : <Navigate to={LOGIN_PATH} />,
      children: [
        {
          path: ZONES_CONTENT_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Entry.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <ZonesContent />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: DIFFERENCES_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Difference.All}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <Differences />
            </RouterPagePermissionsWrapper>
          )
        },
        {
          path: DELIVERIES_PATH,
          element: (
            <RouterPagePermissionsWrapper
              permissions={Delivery.GetDeliveries}
              navigateTo={getNavigateTo(HOME_PATH)}>
              <NewDeliveryProvider>
                <Deliveries />
              </NewDeliveryProvider>
            </RouterPagePermissionsWrapper>
          )
        }
      ]
    },
    { path: '*', element: <ErrorPage /> }
  ])
}
