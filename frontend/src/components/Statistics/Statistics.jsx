import DiagramCancellations from '../Diagrams/DiagramCancellations/DiagramCancellations'
import DiagramExtras from '../Diagrams/DiagramExtras/DiagramExtras'
import DiagramServices from '../Diagrams/DiagramServices/DiagramServices'
import InputFieldDate from '../InputFieldDate/InputFieldDate'
import './Statistics.scss'

const services = {
  item1: 132,
  item2: 73,
  item3: 54,
  item4: 49,
  item5: 46,
}

const extras = {
  item1: 132,
  item2: 73,
  item3: 54,
  item4: 49,
  item5: 46,
  item6: 46,
}

const cancellations = {
  item1: 132,
  item2: 73,
  item3: 54,
  item4: 49,
  item5: 46,
  item6: 46,
}

function Statistics() {
  return (
    <div className="statistics">
      <div className="statistics__inputs-wrapper">
        <InputFieldDate isValid size="small" focus placeholder="Начальная дата" />
        <InputFieldDate isValid size="small" focus placeholder="Конечная дата" />
      </div>
      <div className="statistics__grid">
        <div className="statistics__orders-amount">
          <p className="text-l-bold">Всего заказов</p>
          <h1 className="text-black">132</h1>
        </div>
        <div className="statistics__cancellation-rate">
          <div className="statistics__cancellation-data">
            <p className="text-l-bold">% отмен</p>
            <p className="text-m">отмены: 28</p>
          </div>
          <div className="statistics__cancellation-bar-wrapper">
            <div className="statistics__cancellation-bar">
              <div className="statistics__cancellation-bar-left"></div>
              <div className="statistics__cancellation-bar-right" style={{ width: '7rem' }}></div>
            </div>
            <p className="text-l-bold">10%</p>
          </div>
        </div>
        <div className="statistics__main-services">
          <p className="text-l-bold">Структура по основным услугам</p>
          <DiagramServices data={services} />
        </div>
        <div className="statistics__extra-services">
          <p className="text-l-bold">Структура по дополнительным услугам</p>
          <DiagramExtras data={extras} />
        </div>
        <div className="statistics__cancellation-reasons">
          <p className="text-l-bold">Причины отмены</p>
          <DiagramCancellations data={cancellations} />
        </div>
      </div>
    </div>
  )
}

export default Statistics
