import { useSelector } from 'react-redux'
import ServiceCard from '../ServiceCard/ServiceCard'
import './IncludeServices.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'

function IncludeServices({ cleanType }) {
  const types = useSelector(calculatorSelectors.getTypes)

  const isTypeWindow = types.filter(card => card.id === cleanType)[0]?.title === 'Окна'

  return (
    <div className="include-service__container">
      <p className="text-l">Услуги, которые уже включены</p>
      <div className="include-service__cards">
        {types
          .filter(card => card.id === cleanType)[0]
          ?.service?.filter(service => (!isTypeWindow && service.image) || isTypeWindow)
          .map(service => (
            <ServiceCard key={service.title} content={service.title} img={service.image} />
          ))}
      </div>
    </div>
  )
}

export default IncludeServices
