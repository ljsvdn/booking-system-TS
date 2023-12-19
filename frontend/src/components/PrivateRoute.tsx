import { Navigate, Route } from 'react-router-dom'

interface PrivateRouteProps {
  path: string
  element: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token')

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/admin" replace />
  )
}

export default PrivateRoute
