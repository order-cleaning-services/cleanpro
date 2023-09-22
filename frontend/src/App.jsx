import { Outlet } from 'react-router-dom'

import Header from './components/Header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/auth/authActions'
import { getExtraService, getServiceTypes } from './store/calculator/calculatorActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getServiceTypes())
    dispatch(getExtraService())
    dispatch(getUser())
    // т.к. нет кнопки выйти можно выйти вручную через action
    // dispatch(logOut())
  }, [dispatch])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
