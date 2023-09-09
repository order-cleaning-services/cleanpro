import InputField from '../InputField/InputField'
import './ProfileForm.scss'

const ProfileForm = () => {
  return (
    <form className="profile-form" id="profile-form">
      <div className="profile-form__section">
        <h3 className="profile-form__subheading">Контактная информация</h3>
        <div className="profile-form__inputs-block profile-form__inputs-block_contacts">
          <InputField label="Имя" />
          <InputField label="E-mail" />
          <InputField label="Телефон" />
        </div>
      </div>
      <div className="profile-form__section">
        <h3 className="profile-form__subheading">Адрес</h3>
        <div className="profile-form__inputs-block profile-form__inputs-block_address">
          <InputField label="Город" />
          <InputField label="Улица" />
          <div className="profile-form__small-iputs-wrapper">
            <InputField label="Дом" size="small" />
            <InputField label="Квартира" size="small" />
          </div>
          <div className="profile-form__small-iputs-wrapper">
            <InputField label="Подъезд" size="small" />
            <InputField label="Этаж" size="small" />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
