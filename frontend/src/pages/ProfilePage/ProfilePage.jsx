import ProfileForm from '../../components/ProfileForm/ProfileForm'
import './ProfilePage.scss'

export default function Profile() {
  return (
    <div className="profile">
      <h1 className="profile__title">Профиль</h1>
      <ProfileForm />
    </div>
  )
}
