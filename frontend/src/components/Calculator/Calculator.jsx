import "./Calculator.scss"
import Input from "../input/Input"
import Tab from "../Tab/Tab"
import Counter from "../Counter/Counter"
import ServiceCard from "../ServiceCard/ServiceCard"
import { extraServices, serviceCards } from "../../utils/initialData"
import { useState } from "react"
import ExtraServiceField from "../ExtraServiceField/ExtraServiceField"

function Calculator() {
  const [cleanType, setCleanType] = useState(serviceCards[0].type)
  const [extraIsOpen, setExtraIsOpen] = useState(false)

  function handleActiveType(type) {
    setCleanType(type)
  }

  function isActive(type) {
    return cleanType === type
  }

  return (
    <section className="calculator__container">
      <h2>Выберите вариант уборки, а все сложности оставьте нам</h2>
      <div className="calculator__wrapper">
        <div className="cleaning-type__container">
          <div className="cleaning-type__wrapper">
            <p>Тип уборки</p>
            <div className="cleaning-type__tabs">
              {serviceCards.map((card) => (
                <Tab
                  key={card.type}
                  onChangeType={() => handleActiveType(card.type)}
                  isActive={isActive(card.type)}
                >
                  {card.title}
                </Tab>
              ))}
            </div>
          </div>
          <div className="rooms-quantity">
            <div className="amount__container">
              <p className="amount__title">Количество комнат</p>
              <Counter min={1} max={5} />
            </div>
            <div className="amount__container">
              <p className="amount__title">Количество санузлов</p>
              <Counter min={1} max={5} />
            </div>
          </div>
          <div className="include-service__container">
            <p>Услуги, которые уже включены</p>
            <div className="include-service__cards">
              {serviceCards
                .filter((card) => card.type === cleanType)[0]
                .cards.map((card) => (
                  <ServiceCard
                    key={card.content}
                    content={card.content}
                    img={card.img}
                  />
                ))}
            </div>
          </div>
          <div className="extra-service">
            <p className="extra-service__title">Дополнительные услуги</p>
            <div className="extra-service__container">
              <div className="extra-service-fields__wrapper">
                {extraServices.map(
                  (extra, index) =>
                    (index < 2 || extraIsOpen) && (
                      <ExtraServiceField
                        key={extra.title}
                        title={extra.title}
                        price={extra.price}
                        maxCount={extra.maxCount}
                      />
                    )
                )}
              </div>
              <button
                onClick={() => setExtraIsOpen((prev) => !prev)}
                className="extra-service__btn"
              >
                {extraIsOpen ? "Свернуть" : "Посмотреть еще 4 опции"}
              </button>
            </div>
          </div>
        </div>
        <div className="calculator-form__wrapper">
          <div className="calculator-form__total">
            <p className="calculator-form__title">
              Уборка квартиры с 1 жилой комнатой и 1 санузлом
            </p>
            <div className="total__wrapper">
              <div className="flex__wrapper">
                <p className="pay__title">К оплате</p>
                <span className="pay__sum">5 000 ₽</span>
              </div>
              <div className="flex__wrapper">
                <p className="clean-time">Примерное время уборки</p>
                <span className="clean-time">≈ 2ч 10мин</span>
              </div>
            </div>
          </div>
          <form>
            <Input placeholder="Имя" />
            <Input placeholder="e-mail" />
            <Input placeholder="Телефон" />
            <Input placeholder="Город" />
            <Input placeholder="Улица" />
            <div className="inputs_wrapper">
              <Input size="small" placeholder="Дом" />
              <Input size="small" placeholder="Квартира" />
              <Input size="small" placeholder="Подъезд" />
              <Input size="small" placeholder="Этаж" />
              <Input size="small" placeholder="Дата" />
              <select required name="time" className="time-selection">
                <option className="option-time" value="0" hidden>
                  Время
                </option>
                {Array.from({ length: 8 }, (_, i) => i + 9).map((num) => (
                  <option className="time-option" value={num} key={num}>
                    {num < 10 ? `0${num}` : num}:00
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="order-comment"
              placeholder="Комментарии к заказу (например, имеется аллергия на чистящие средства или необходимо забрать вещи из химчистки)"
            />
            <button className="form-btn">Заказать</button>
            <p className="inform-text">
              Нажимая «Заказать», я даю согласие на{" "}
              <span>Обработку персональных данных</span> и{" "}
              <span>Договор оферты</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Calculator
