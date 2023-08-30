import { createBrowserRouter } from 'react-router-dom'

import App from '../App.jsx'
import MainPage from '../components/pages/MainPage/MainPage.jsx'
import AboutPage from '../components/pages/AboutPage/AboutPage.jsx'
import ProfilePage from '../components/pages/ProfilePage/ProfilePage.jsx'
import SigninPage from '../components/pages/SigninPage/SigninPage.jsx'
import Page404 from '../components/pages/Page404/Page404.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'signin',
        element: <SigninPage />,
      },
    ],
  },
])

export default router
