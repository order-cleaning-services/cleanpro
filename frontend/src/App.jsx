import { Outlet } from 'react-router-dom'
import FormEntry from './components/FormEntry/FormEntry'

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <FormEntry />
    </>
  )
}

export default App
