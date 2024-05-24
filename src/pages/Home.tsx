import { Link } from 'react-router-dom'
import { LOGIN_PATH, MAIN_PATH, PROJECTS_PATH_EXAMPLE } from '@/router/routerPaths.ts'

export default function Home() {
  return (
    <>
      <p>Hello world</p>
      <Link to={PROJECTS_PATH_EXAMPLE}>Projects</Link>
      <div>
        <Link to={LOGIN_PATH}>Login</Link>
      </div>
      <div>
        <Link to={MAIN_PATH}>Main Page</Link>
      </div>
    </>
  )
}
