import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/auth/authActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    // т.к. нет кнопки выйти можно выйти вручную через action
    // dispatch(logOut())
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
