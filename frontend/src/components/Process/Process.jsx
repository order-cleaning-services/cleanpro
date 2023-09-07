import ProcessCard from '../ProcessCard/ProcessCard'
import './Process.scss'

const processCards = [
  {
    id: 1,
    title: 'Выберите тип уборки',
    content: 'Уборка на разные случаи жизни. Настройте все параметры индивидуально под свой запрос.',
  },
  {
    id: 2,
    title: 'Заполните форму ниже',
    content: 'Пригласите специалиста, заполнив форму заказа. Этот процесс быстрый простой и удобный.',
  },
  {
    id: 3,
    title: 'Оплатите онлайн',
    content: 'Оплачивайте заказы быстро и безопасно через сервис "Тралала" и получите чек на указанную вами почту.',
  },
  {
    id: 4,
    title: 'Примите работу :)',
    content: 'Оцените выполненную работу и поделитесь вашим мнением, оставив отзыв о нашей команде',
  },
]

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
