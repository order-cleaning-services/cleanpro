import { useState } from 'react'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import './ProfilePage.scss'
import OrderCard from '../../components/OrderCard/OrderCard'
import Footer from '../../components/Footer/Footer'


export default function Profile() {
  const [isProfileFormActive, setIsProfileFormActive] = useState(false)
  const toggleFormActive = () => setIsProfileFormActive(!isProfileFormActive)
  return (
    <>
      <div className="profile">
        <h1 className="profile__title">Профиль</h1>
        <nav className="profile__menu">
          <button
            className={`profile__menu-button ${isProfileFormActive ? '' : 'profile__menu-button_active'}`}
            onClick={toggleFormActive}>
            Мои уборки
          </button>
          <button
            className={`profile__menu-button ${isProfileFormActive ? 'profile__menu-button_active' : ''}`}
            onClick={toggleFormActive}>
            Личные данные
          </button>
        </nav>
        {isProfileFormActive ? (
          <ProfileForm />
        ) : (
          <div className="profile__cards">
            <OrderCard />
            <OrderCard />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
