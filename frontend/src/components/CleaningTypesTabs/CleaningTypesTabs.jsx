import './CleaningTypesTabs.scss'
import Tab from '../Tab/Tab'

function CleaningTypesTabs({ types, isActive, onHandleActiveType }) {
  return (
    <div className="cleaning-type__wrapper">
      <p className="text-l">Тип уборки</p>
      <div className="cleaning-type__tabs">
        {types.map(card => (
          <Tab key={card.title} onChangeType={() => onHandleActiveType(card.id)} isActive={isActive(card.id)}>
            {card.title}
          </Tab>
        ))}
      </div>
    </div>
  )
}

export default CleaningTypesTabs
