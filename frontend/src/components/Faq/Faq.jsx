import { useState } from 'react'
import './Faq.scss'
import right from '../../images/arr-down.svg'
import down from '../../images/arr-right.svg'

const Faq = () => {
  const [toggle, setToggle] = useState({ 1: true })

  let questions = [
    {
      id: 1,
      title: 'Я могу оставить клинера одного дома?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
    {
      id: 2,
      title: 'Клинер сможет убраться в труднодоступных местах?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
    {
      id: 3,
      title: 'Как считать количество санузлов?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
    {
      id: 4,
      title: 'Какие имеются способы оплаты?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
    {
      id: 5,
      title: 'У меня много комнат и окон, клинер справится?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
    {
      id: 6,
      title: 'Получу ли я чек после оплаты?',
      text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
    },
  ]

  function toggleFunction(id) {
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    })
  }

  return (
    <section className="faq">
      <h3 className="faq__title">Частые вопросы</h3>
      <div className="faq__questions">
        {questions.map(el => (
          <div key={el.id} className="faq__question">
            <div onClick={() => toggleFunction(el.id)} className="faq__question-header">
              {toggle[el.id] ? (
                <img className="faq__question-icon" src={right} alt="arrow-down" />
              ) : (
                <img className="faq__question-icon" src={down} alt="arrow-right" />
              )}
              <h4 className="faq__question-title">{el.title}</h4>
            </div>
            {toggle[el.id] ? (
              <p className="faq__question-text">{el.text}</p>
            ) : (
              <p style={{ display: 'none' }} className="faq__question-text">
                {el.text}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Faq
