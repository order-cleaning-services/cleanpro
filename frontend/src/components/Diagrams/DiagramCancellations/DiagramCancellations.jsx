import './DiagramCancellations.scss'

function DiagramCancellations({ data }) {
  const { item1, item2, item3, item4, item5, item6 } = data
  const sum = item1 + item2 + item3 + item4 + item5 + item6
  const percentage1 = item1 / sum
  const percentage2 = item2 / sum
  const percentage3 = item3 / sum
  const percentage4 = item4 / sum
  const percentage5 = item5 / sum
  const percentage6 = item6 / sum

  const width = 47.2
  const height = 19.2

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
    <>
      <div className="diagram-cancellations">
        <div className="diagram-cancellations__container">
          <div className="diagram-cancellations__wrapper">
            <div className="diagram-cancellations__one" style={{ width: `${c}rem`, height: `${b}rem` }}>
              {getPercentageString(percentage1)}
            </div>
            <div className="diagram-cancellations__two" style={{ width: `${c}rem`, height: `${a}rem` }}>
              {getPercentageString(percentage2)}
            </div>
          </div>
          <div className="diagram-cancellations__three" style={{ width: `${d}rem`, height: `${a + b}rem` }}>
            {getPercentageString(percentage3)}
          </div>
          <div className="diagram-cancellations__wrapper">
            <div className="diagram-cancellations__four" style={{ width: `${e}rem`, height: `${f}rem` }}>
              {getPercentageString(percentage4)}
            </div>
            <div className="diagram-cancellations__five" style={{ width: `${e}rem`, height: `${g}rem` }}>
              {getPercentageString(percentage5)}
            </div>
            <div className="diagram-cancellations__six" style={{ width: `${e}rem`, height: `${h}rem` }}>
              {getPercentageString(percentage5)}
            </div>
          </div>
        </div>
        <ul className="diagram-cancellations__list">
          <li className="diagram-cancellations__item">
            <div></div>
            <p className="text-m">Изменились планы: 28</p>
          </li>
          <li className="diagram-cancellations__item">
            <div className="diagram__bullet"></div>
            <p className="text-m">Сделали уборку сами:132</p>
          </li>
          <li className="diagram-cancellations__item">
            <div></div>
            <p className="text-m">Нашли другого клинера: 132</p>
          </li>
          <li className="diagram-cancellations__item">
            <div></div>
            <p className="text-m">Никого не будет дома: 132</p>
          </li>
          <li className="diagram-cancellations__item">
            <div></div>
            <p className="text-m">Не поравился клинер: 132</p>
          </li>
          <li className="diagram-cancellations__item">
            <div></div>
            <p className="text-m">Другие причины: 132</p>
          </li>
        </ul>
      </div>
      <p className="text-l-bold">Другие причины</p>
      <div className="diagram-cancellations__other-reasons">
        <div className="diagram-cancellations__reason">
          Кажется я и сама могу со всем справиться, я взрослая и организованная женщина
        </div>
        <div className="diagram-cancellations__reason">Умерла черепаха</div>
        <div className="diagram-cancellations__reason">
          У меня упал майонез с верхней полки и загваздал всю квартиру, не хочу, чтобы клинеры это видели...
        </div>
        <div className="diagram-cancellations__reason">
          Начитались отзывов в интернете про эти уборки, не надо нам такого
        </div>
        <div className="diagram-cancellations__reason">Просто не хочу, чтобы кто-то приходил сейчас</div>
        <div className="diagram-cancellations__reason">У меня кончились деньги на карте</div>
      </div>
    </>
  )
}

export default DiagramCancellations
