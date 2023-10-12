import { processCards } from '../../utils/processData'
import ProcessCard from '../ProcessCard/ProcessCard'
import './Process.scss'

function Process() {
  return (
    <div className="process">
      <h2>4 простых шага для вашей уборки</h2>
      <div className="process-cards">
        {processCards.map(card => (
          <ProcessCard key={card.id} title={card.title} content={card.content} />
        ))}
      </div>
    </div>
  )
}

export default Process
