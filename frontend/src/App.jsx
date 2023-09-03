import { Outlet } from 'react-router-dom'
// import FormEntry from './components/FormEntry/FormEntry';

import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
