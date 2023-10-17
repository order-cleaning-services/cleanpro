import { Navigate, useLocation, Outlet } from 'react-router'
import { ROUTES } from '../constants/constants'
import { authSelectors } from '../store/auth/authSelectors'
import { useSelector } from 'react-redux'

function RequireAuth({ require = true }) {
  const location = useLocation()
  const isAuth = useSelector(authSelectors.getIsAuth)

  if (!isAuth && require) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location }} replace />
  }
  if (isAuth && !require) {
    return <Navigate to={ROUTES.HOME} state={{ from: location }} replace />
  }
  return <Outlet />
}

export default RequireAuth
