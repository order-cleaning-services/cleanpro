import { useState } from 'react'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import './ProfilePage.scss'

export default function Profile() {
  const [isProfileFormActive, setIsProfileFormActive] = useState(false)
  const toggleFormActive = () => setIsProfileFormActive(!isProfileFormActive)
  return (
    <div className="profile">
      <h1 className="profile__title">Профиль</h1>
      <nav>
        <button
          className={`profile__button ${isProfileFormActive ? '' : 'profile__button_active'}`}
          onClick={toggleFormActive}>
          Мои уборки
        </button>
        <button
          className={`profile__button ${isProfileFormActive ? 'profile__button_active' : ''}`}
          onClick={toggleFormActive}>
          Личные данные
        </button>
      </nav>
      {isProfileFormActive && <ProfileForm />}
    </div>
  )
}
