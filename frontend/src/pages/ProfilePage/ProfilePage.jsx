import { useEffect, useState } from 'react'
import ProfileForm from '../../components/ProfileForm/ProfileForm'
import './ProfilePage.scss'
import OrderCard from '../../components/OrderCard/OrderCard'
import Footer from '../../components/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { orderSelectors } from '../../store/order/orderSelectors'
import { getUserOrders } from '../../store/order/orderActions'

export default function Profile() {
  const dispatch = useDispatch()
  const userOrders = useSelector(orderSelectors.getAllOrders)

  const [isProfileFormActive, setIsProfileFormActive] = useState(false)
  const toggleFormActive = () => setIsProfileFormActive(!isProfileFormActive)

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  return (
    <div className="profile">
      <div className="profile__content">
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
            {userOrders?.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
