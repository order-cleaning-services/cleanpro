import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from './store/auth/authActions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
