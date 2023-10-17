import { useState } from 'react'
import './Faq.scss'
import right from '../../assets/images/arr-down.svg'
import down from '../../assets/images/arr-right.svg'
import { questions } from '../../utils/faqData'

const Faq = () => {
  const [toggle, setToggle] = useState({ 1: true })

  function toggleFunction(id) {
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    })
  }

  return (
    <section className="faq" id="faq">
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
