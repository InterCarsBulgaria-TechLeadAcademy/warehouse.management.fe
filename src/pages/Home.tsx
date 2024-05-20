import { Link } from 'react-router-dom'
import { PROJECTS_PATH_EXAMPLE } from '@/router/routerPaths.ts'

export default function Home() {
  return (
    <>
      <p>Hello world</p>
      <Link to={PROJECTS_PATH_EXAMPLE}>Projects</Link>
    </>
  )
}
