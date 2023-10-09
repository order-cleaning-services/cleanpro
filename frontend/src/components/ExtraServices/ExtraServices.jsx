import { useSelector } from 'react-redux'
import ExtraServiceField from '../ExtraServiceField/ExtraServiceField'
import './ExtraServices.scss'
import { calculatorSelectors } from '../../store/calculator/calculatorSelectors'

function ExtraServices() {
  const extras = useSelector(calculatorSelectors.getExtras)

  return (
    <div className="extra-service">
      <p className="text-l">Дополнительные услуги</p>
      <div className="extra-service__container">
        <div className="extra-service-fields__wrapper">
          {extras.map((extra, index) => (
            <ExtraServiceField
              key={extra.title}
              title={extra.title}
              price={extra.price}
              maxCount={extra.maxCount}
              index={index}
              measure={extra.measure}
              amount={extra.amount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExtraServices
