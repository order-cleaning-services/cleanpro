import './Materials.scss'
import material1 from '../../assets/images/material1.png'
import material2 from '../../assets/images/material2.png'
import material3 from '../../assets/images/material3.png'
const Materials = () => {
  return (
    <section className="materials">
      <h2 className="materials__title">Средства и материалы</h2>
      <div className="materials__cards">
        <div className="materials__card full">
          <p className="materials__card-title">Специальная техника</p>
          <img className="materials__card-img full-img" src={material1} alt="" />
          <p className="materials__card-text full-text">
            Профессиональная техника Karcher предоставляет возможность быстро и эффективно избавиться от загрязнений
            любой степени сложности. Эти аппараты идеально подходят для глубокой очистки ковров и мягкой мебели,
            обеспечивая высокое качество работы. Справляются даже с самыми стойкими загрязнениями, обеспечивают борьбу с
            микробами и осуществляют дезинфекцию, гарантируя чистоту и гигиеничность.
          </p>
        </div>

        <div className="materials__card-section">
          <div className="materials__card ">
            <p className="materials__card-title">Профессиональные средства</p>
            <img className="materials__card-img" src={material2} alt="material-img" />
            <p className="materials__card-text">
              Мы предпочитаем использовать только сертифицированные чистящие средства от бельгийской компании CHRISAL,
              известной под брендом Ecolife (Эколайф). Эта компания специализируется на создании экологически безопасных
              профессиональных очистителей.
            </p>
          </div>
          <div className="materials__card ">
            <p className="materials__card-title">Гипоаллергенные составы</p>
            <img className="materials__card-img" src={material3} alt="material-img" />
            <p className="materials__card-text">
              Вся продукция Ecolife, независимо от области применения, разработана без использования агрессивных
              химических компонентов, а также не содержит ароматических веществ и красителей, что позволяет избежать
              аллергических реакций.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Materials
