import './DiagramExtras.scss'

function DiagramExtras({ data }) {
  const { item1, item2, item3, item4, item5, item6 } = data
  const sum = item1 + item2 + item3 + item4 + item5 + item6
  const percentage1 = item1 / sum
  const percentage2 = item2 / sum
  const percentage3 = item3 / sum
  const percentage4 = item4 / sum
  const percentage5 = item5 / sum
  const percentage6 = item6 / sum

  const width = 43.2
  const height = 18.8

  const square = width * height

  const c = (percentage1 + percentage2) * width
  const a = (square * percentage2) / c
  const b = (square * percentage1) / c
  const d = (square * percentage3) / (a + b)
  const e = width - c - d
  const f = (square * percentage4) / e
  const g = (square * percentage5) / e
  const h = (square * percentage6) / e

  function getPercentageString(per) {
    return `${Math.round(per * 100)}%`
  }

  return (
    <div className="diagram-extras">
      <div className="diagram-extras__container">
        <div className="diagram-extras__wrapper">
          <div className="diagram-extras__one" style={{ width: `${c}rem`, height: `${b}rem` }}>
            {getPercentageString(percentage1)}
          </div>
          <div className="diagram-extras__two" style={{ width: `${c}rem`, height: `${a}rem` }}>
            {getPercentageString(percentage2)}
          </div>
        </div>
        <div className="diagram-extras__three" style={{ width: `${d}rem`, height: `${a + b}rem` }}>
          {getPercentageString(percentage3)}
        </div>
        <div className="diagram-extras__wrapper">
          <div className="diagram-extras__four" style={{ width: `${e}rem`, height: `${f}rem` }}>
            {getPercentageString(percentage4)}
          </div>
          <div className="diagram-extras__five" style={{ width: `${e}rem`, height: `${g}rem` }}>
            {getPercentageString(percentage5)}
          </div>
          <div className="diagram-extras__six" style={{ width: `${e}rem`, height: `${h}rem` }}>
            {getPercentageString(percentage5)}
          </div>
        </div>
      </div>
      <ul className="diagram-extras__list">
        <li className="diagram-extras__item">
          <div></div>
          <p className="text-m">Уборка балкона: 28</p>
        </li>
        <li className="diagram-extras__item">
          <div className="diagram__bullet"></div>
          <p className="text-m">Мытье духовки внутри:132</p>
        </li>
        <li className="diagram-extras__item">
          <div></div>
          <p className="text-m">Мытье окон дополнительное: 132</p>
        </li>
        <li className="diagram-extras__item">
          <div></div>
          <p className="text-m">Мытье холодильника: 132</p>
        </li>
        <li className="diagram-extras__item">
          <div></div>
          <p className="text-m">Глажка: 132</p>
        </li>
        <li className="diagram-extras__item">
          <div></div>
          <p className="text-m">Мытье микроволновки: 132</p>
        </li>
      </ul>
    </div>
  )
}

export default DiagramExtras
