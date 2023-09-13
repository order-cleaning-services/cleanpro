import { Link } from 'react-router-dom'
import './Page404.scss'
import Header from '../../components/Header/Header'

function Page404() {
  return (
    <>
      <Header />
      <section className="page-404">
        <div className="page-404__content">
          <h2 className="page-404__title">404</h2>
          <p className="page-404__subtitle">Такой страницы не найдено</p>
          <Link className="page-404__link">Перейти на главную</Link>
        </div>
      </section>
    </>
  )
}

export default Page404
