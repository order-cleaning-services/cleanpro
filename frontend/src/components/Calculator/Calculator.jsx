import './Calculator.scss'
import Tab from '../Tab/Tab'
import Counter from '../Counter/Counter'
import { useEffect, useState } from 'react'
import OrderForm from '../OrderForm/OrderForm'
import Total from '../Total/Total'
import ExtraServices from '../ExtraServices/ExtraServices'
import IncludeServices from '../IncludeServices/IncludeServices'
import { serviceCards } from '../../utils/initialData'

function Calculator() {
  const [cleanType, setCleanType] = useState(serviceCards[0].id)
  const [total, setTotal] = useState(serviceCards[0].price)
  const [room, setRoom] = useState(1)
  const [toilet, setToilet] = useState(1)
  const [window, setWindow] = useState(1)

  const isTypeWindow = serviceCards.filter(card => card.id === cleanType)[0].title === 'Окна'

  useEffect(() => {
    setTotal(serviceCards.filter(card => card.id === cleanType)[0].price)
  }, [cleanType])

  function handleActiveType(id) {
    setCleanType(id)
    setRoom(1)
    setToilet(1)
  }

  function isActive(id) {
    return cleanType === id
  }

  return (
    <section className="calculator__container">
      <h2>Выберите тип уборки</h2>
      <div className="calculator__wrapper">
        <div className="cleaning-type__container">
          <div className="cleaning-type__wrapper">
            <p className="text-l">Тип уборки</p>
            <div className="cleaning-type__tabs">
              {serviceCards.map(card => (
                <Tab key={card.id} onChangeType={() => handleActiveType(card.id)} isActive={isActive(card.id)}>
                  {card.title}
                </Tab>
              ))}
            </div>
          </div>
          <div className="rooms-quantity">
            {isTypeWindow ? (
              <>
                <div className="amount__container">
                  <p className="text-l">Количество окон</p>
                  <Counter count={window} min={1} max={10} price={1500} setCount={setWindow} setTotal={setTotal} />
                </div>
                <div className="checkbox__wrapper">
                  <p className="text-l">Панорамные окна</p>
                  <input type="checkbox" />
                </div>
              </>
            ) : (
              <>
                <div className="amount__container">
                  <p className="text-l">Количество комнат</p>
                  <Counter count={room} min={1} max={5} price={1500} setCount={setRoom} setTotal={setTotal} />
                </div>
                <div className="amount__container">
                  <p className="amount__title">Количество санузлов</p>
                  <Counter count={toilet} min={1} max={5} price={1000} setCount={setToilet} setTotal={setTotal} />
                </div>
              </>
            )}
          </div>
          <IncludeServices cleanType={cleanType} />
          {!isTypeWindow && <ExtraServices setTotal={setTotal} />}
        </div>
        <div className="calculator-form__wrapper">
          <Total total={total} />
          <OrderForm />
        </div>
      </div>
    </section>
  )
}

export default Calculator
