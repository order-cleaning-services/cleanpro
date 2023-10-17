import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import MainPage from '../pages/MainPage/MainPage.jsx'
import AboutPage from '../pages/AboutPage/AboutPage.jsx'
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx'
import SigninPage from '../pages/SigninPage/SigninPage.jsx'
import Page404 from '../pages/Page404/Page404.jsx'
import PaymentPage from '../pages/PaymentPage/PaymentPage.jsx'
import AdminPage from '../pages/AdminPage/AdminPage.jsx'

import { ROUTES } from '../constants/constants.js'
import RequireAuth from '../hocs/RequireAuth.jsx'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: ROUTES.HOME,
        element: <MainPage />,
      },
      {
        path: ROUTES.ABOUT,
        element: <AboutPage />,
      },
      {
        path: ROUTES.ADMIN,
        element: <AdminPage />,
      },
      {
        path: ROUTES.PROFILE,
        element: <RequireAuth />,
        children: [
          {
            path: ROUTES.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: ROUTES.SIGNIN,
        element: <RequireAuth require={false} />,
        children: [
          {
            path: ROUTES.SIGNIN,
            element: <SigninPage />,
          },
        ],
      },
      {
        path: ROUTES.PAYMENT,
        element: <PaymentPage />,
      },
    ],
  },
])

export default router
