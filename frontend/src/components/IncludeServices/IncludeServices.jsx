import { serviceCards } from '../../utils/initialData'
import ServiceCard from '../ServiceCard/ServiceCard'
import './IncludeServices.scss'

function IncludeServices({ cleanType }) {
  return (
    <div className="include-service__container">
      <p className="text-l">Услуги, которые уже включены</p>
      <div className="include-service__cards">
        {serviceCards
          .filter(card => card.id === cleanType)[0]
          .cards.map(card => (
            <ServiceCard key={card.content} content={card.content} img={card.img} />
          ))}
      </div>
    </div>
  )
}

export default IncludeServices
