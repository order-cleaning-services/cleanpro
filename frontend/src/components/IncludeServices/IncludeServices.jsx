import { useSelector } from 'react-redux'
import ServiceCard from '../ServiceCard/ServiceCard'
import './IncludeServices.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'

function IncludeServices({ cleanType }) {
  const types = useSelector(calculatorSelectors.getTypes)

  return (
    <div className="include-service__container">
      <p className="text-l">Услуги, которые уже включены</p>
      <div className="include-service__cards">
        {types
          .filter(card => card.id === cleanType)[0]
          ?.service?.filter(card => card.title !== 'Выезд')
          .map(card => (
            <ServiceCard key={card.title} content={card.title} img={card.image} />
          ))}
      </div>
    </div>
  )
}

export default IncludeServices
