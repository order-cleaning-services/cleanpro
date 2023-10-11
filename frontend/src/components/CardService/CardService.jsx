import '../GridAdmin/GridAdmin.scss'
import './CardService.scss'
import img from '../../images/material2.png'
import edit from '../../images/edit.png'

function CardService({ onClick }) {
  return (
    <div className="card-service grid-services">
      <p className="grid-services__item text-s">Протираем мебель от пыли</p>
      <p className="grid-services__item text-m-bold">Дополнительная</p>
      <p className="grid-services__item text-m-bold">5000</p>
      <p className="grid-services__item text-m-bold">Комната</p>
      <p className="grid-services__item text-m-bold">10</p>
      <div className="grid-services__item">
        <img className="card-service__img" src={img} alt="Изображение услуги" />
        <img className="card-service__edit" onClick={onClick} src={edit} alt="Редактировать" />
      </div>
    </div>
  )
}

export default CardService
