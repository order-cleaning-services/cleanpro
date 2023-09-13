import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import MainPage from '../pages/MainPage/MainPage.jsx'
import AboutPage from '../pages/AboutPage/AboutPage.jsx'
import ProfilePage from '../pages/ProfilePage/ProfilePage.jsx'
import SigninPage from '../pages/SigninPage/SigninPage.jsx'
import Page404 from '../pages/Page404/Page404.jsx'

import { ROUTES } from '../constants/constants.js'

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: ROUTES.home,
        element: <MainPage />,
      },
      {
        path: ROUTES.about,
        element: <AboutPage />,
      },
      {
        path: ROUTES.profile,
        element: <ProfilePage />,
      },
      {
        path: ROUTES.signin,
        element: <SigninPage />,
      },
    ],
  },
])

export default router
