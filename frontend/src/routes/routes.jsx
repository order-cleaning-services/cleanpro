import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import MainPage from '../components/pages/MainPage/MainPage.jsx'
import AboutPage from '../components/AboutPage/AboutPage.jsx'
import ProfilePage from '../components/pages/ProfilePage/ProfilePage.jsx'
import SigninPage from '../components/pages/SigninPage/SigninPage.jsx'
import Page404 from '../components/pages/Page404/Page404.jsx'

import routes from '../constants/constants.jsx'

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: routes.home,
        element: <MainPage />,
      },
      {
        path: routes.about,
        element: <AboutPage />,
      },
      {
        path: routes.profile,
        element: <ProfilePage />,
      },
      {
        path: routes.signin,
        element: <SigninPage />,
      },
    ],
  },
])

export default router
