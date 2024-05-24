import { useRoutes } from 'react-router-dom'
import { lazy } from 'react'
// import { LOGIN_PATH, MAIN_PATH, PROJECTS_PATH_EXAMPLE } from '@/router/routerPaths.ts'
import { MAIN_PATH, PROJECTS_PATH_EXAMPLE } from '@/router/routerPaths.ts'

const Home = lazy(() => import('@/pages/Home.tsx'))
const Projects = lazy(() => import('@/pages/Projects.tsx'))
// const Login = lazy(() => import('@/pages/Login.tsx'))
const Main = lazy(() => import('@/pages/Main.tsx'))

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
    // {
    //   path: LOGIN_PATH,
    //   element: <Login />
    // },
    {
      path: MAIN_PATH,
      element: <Main />
    }
  ])
}
