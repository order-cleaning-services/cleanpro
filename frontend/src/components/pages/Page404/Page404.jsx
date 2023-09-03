import { useRouteError } from 'react-router-dom'

import Header from '../../Header/Header'

export default function Page404() {
  const error = useRouteError()
  console.error(error)

  return (
    <>
      <Header />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  )
}
