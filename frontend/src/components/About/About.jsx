import Logo from '../Logo/Logo'
import './About.scss'

import AboutMore from '../AboutMore/AboutMore'

function About() {
  return (
    <>
      <div className="about">
        <div className="about__container-statistics">
          <div className="about__purpose">
            <Logo />
            <p className="about__span">—</p>
            <div className="about__text-items">
              <p className="about__text text-m">
                профессиональные эксперты в&nbsp;сфере уборки. Наша цель&nbsp;&mdash; обеспечить безупречную чистоту
                в&nbsp;вашем доме.
              </p>
              <p className="about__text text-m">
                Берем на&nbsp;себя заботу о&nbsp;чистоте, чтобы вы могли сосредоточиться на&nbsp;важном.
              </p>
            </div>
          </div>
          <div className="about__card-statistics">
            <p className="about__card-title">2</p>
            <p className="about__card-subtitle text-s">года&nbsp;заботимся о&nbsp;чистоте&nbsp;и&nbsp;уюте</p>
          </div>
          <div className="about__card-statistics">
            <p className="about__card-title">400</p>
            <p className="about__card-subtitle text-s">
              клиентов
              <br />
              воспользовались нашими&nbsp;услугами
            </p>
          </div>
          <div className="about__card-statistics">
            <p className="about__card-title">100</p>
            <p className="about__card-subtitle text-s">
              клинеров
              <br />
              осуществляют
              <br />
              качеcтвенную работу
            </p>
          </div>
        </div>
        <div className="about__more">
          <AboutMore
            title="Калькулятор стоимости"
            subTitle="Узнайте полную стоимость услуг перед&nbsp;оплатой"
            src="./src/assets/images/calc-rub-about.svg"
          />
          <AboutMore
            title="Опытные профессионалы"
            subTitle="Отбираем наши сотрудников по&nbsp;какой нибудь системе"
            src="./src/assets/images/profs-about.svg"
          />
          <AboutMore
            title="Без сюрпризов"
            subTitle="Обосновать удобство предоплаты, цена после&nbsp;уборки не&nbsp;изменится"
            src="./src/assets/images/warranty-about.svg"
          />
          <AboutMore
            title="Выбор клинера"
            subTitle="Выберите клинера, который уже&nbsp;знает что&nbsp;как"
            src="./src/assets/images/choice-about.svg"
          />
        </div>
      </div>
    </>
  )
}

export default About
