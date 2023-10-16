import banner from '../../assets/images/banner.jpg'
import './Banner.scss'

function Banner() {
  return (
    <div className="banner">
      <img src={banner} />
      <div className="banner-text">
        <h3>Клининговый сервис</h3>
        <h1>
          Позаботимся о чистоте, чтобы освободить <br />
          ваше время для любимого дела
        </h1>
      </div>
    </div>
  )
}

export default Banner
