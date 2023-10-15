import './DiagramServices.scss'

function DiagramServices({ data }) {
  const { item1, item2, item3, item4, item5 } = data
  const sum = item1 + item2 + item3 + item4 + item5
  const percentage1 = item1 / sum
  const percentage2 = item2 / sum
  const percentage3 = item3 / sum
  const percentage4 = item4 / sum
  const percentage5 = item5 / sum

  const width = 43.1
  const height = 22.2

  const square = width * height

  const c = (percentage1 + percentage2) * width
  const a = (square * percentage2) / c
  const b = (square * percentage1) / c
  const d = (square * percentage3) / (a + b)
  const e = width - c - d
  const f = (square * percentage4) / e
  const g = (square * percentage5) / e

  function getPercentageString(per) {
    return `${Math.round(per * 100)}%`
  }

  return (
    <div className="diagram-services">
      <div className="diagram-services__container">
        <div className="diagram-services__wrapper">
          <div className="diagram-services__one" style={{ width: `${c}rem`, height: `${b}rem` }}>
            {getPercentageString(percentage1)}
          </div>
          <div className="diagram-services__two" style={{ width: `${c}rem`, height: `${a}rem` }}>
            {getPercentageString(percentage2)}
          </div>
        </div>
        <div className="diagram-services__three" style={{ width: `${d}rem`, height: `${a + b}rem` }}>
          {getPercentageString(percentage3)}
        </div>
        <div className="diagram-services__wrapper">
          <div className="diagram-services__four" style={{ width: `${e}rem`, height: `${f}rem` }}>
            {getPercentageString(percentage4)}
          </div>
          <div className="diagram-services__five" style={{ width: `${e}rem`, height: `${g}rem` }}>
            {getPercentageString(percentage5)}
          </div>
        </div>
      </div>
      <ul className="diagram-services__list">
        <li className="diagram-services__item">
          <div></div>
          <p className="text-m">Поддерживающая: 28</p>
        </li>
        <li className="diagram-services__item">
          <div></div>
          <p className="text-m">Генеральная:132</p>
        </li>
        <li className="diagram-services__item">
          <div></div>
          <p className="text-m">После ремонта: 132</p>
        </li>
        <li className="diagram-services__item">
          <div></div>
          <p className="text-m">После мероприятия: 132</p>
        </li>
        <li className="diagram-services__item">
          <div></div>
          <p className="text-m">Мытье окон: 132</p>
        </li>
      </ul>
    </div>
  )
}

export default DiagramServices
