import '../GridAdmin/GridAdmin.scss'
import './CardService.scss'

import img from '../../images/material2.png'
import edit from '../../images/edit.png'

function CardService({ style }) {
  return (
    <div className="card-service grid-services">
      <p className="grid-services__item card-service__item text-m-bold">Протираем бытовую технику</p>
      <p className={`grid-services__item ${style}`}>5000</p>
      <p className={`grid-services__item ${style}`}>Комната</p>
      <p className={`grid-services__item ${style}`}>10</p>

      <p className={`grid-services__item ${style}`}>Осн</p>
      <div className="grid-services__item card-service__item">
        <img className="card-service__img" src={img} alt="Изображение услуги" />
        <img className="card-service__edit" src={edit} alt="Редактировать" />
      </div>
    </div>
  )
}

export default CardService
