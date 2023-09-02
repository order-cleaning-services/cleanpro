import { useState } from 'react';
import './Faq.scss';
import right from '../../images/arr-down.svg';
import down from '../../images/arr-right.svg';

const Faq = () => {

      const [isVisible, setIsVisible] = useState(1);

    let questions= [{
        id: 1,
        title: 'Я могу оставить клинера одного дома?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 1
    },
    {
        id: 2,
        title: 'Клинер сможет убраться в труднодоступных местах?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 2
    },
    {
        id: 3,
        title: 'Как считать количество санузлов?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 2
    },
    {
        id: 4,
        title: 'Какие имеются способы оплаты?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 2
    },
    {
        id: 5,
        title: 'У меня много комнат и окон, клинер справится?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 2
    },
    {
        id: 6,
        title: 'Получу ли я чек после оплаты?',
        text: 'Конечно, вы можете доверить уборку клинеру и заняться своими делами. Однако не забудьте вернуться домой к окончанию процесса уборки, чтобы оценить результаты его работы.',
        full: 2
    },
]

const secondColumnStart = Math.floor(questions.length / 2);


const toggle = (el) => {
    if (isVisible == el.id)
        setIsVisible(false)
    else
        setIsVisible(el.id)
}

    return (
        <section className='faq'>
            <h3 className='faq__title'>Частые вопросы</h3>
            <div className='faq__questions'>
                <div className='faq__questions-section'>
                {questions.slice(0,secondColumnStart).map(el => 
            <div key={el.id} className='faq__question'>
                <div onClick={() => toggle(el) } className='faq__question-header'>
                
                    {el.id==isVisible?<img className='faq__question-icon' src={right} alt="" />:<img className='faq__question-icon' src={down} alt="" />}
                
                <h4 className='faq__question-title'>{el.title}</h4></div>
                {el.id==isVisible?<p className='faq__question-text'>{el.text}</p>:<p style={{display:'none'}} className='faq__question-text'>{el.text}</p>}
            </div>
            )}
                </div>
                <div className='faq__questions-section'>
                {questions.slice(secondColumnStart).map(el => 
            <div key={el.id} className='faq__question'>
                <div onClick={() => toggle(el) } className='faq__question-header'>
                
                    {el.id==isVisible?<img className='faq__question-icon' src={right} alt="" />:<img className='faq__question-icon' src={down} alt="" />}
                
                <h4 className='faq__question-title'>{el.title}</h4></div>
                {el.id==isVisible?<p className='faq__question-text'>{el.text}</p>:<p style={{display:'none'}} className='faq__question-text'>{el.text}</p>}
            </div>
            )}
                </div>
            {/* {questions.map(el => 
            <div key={el.id} className='faq__question'>
                <div className='faq__question-header'>
                <span onClick={() => setFull(!full)} className='faq__question-icon'>
                    {el.full?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M4 6L8 10L12 6" stroke="#242424"/>
                    </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12.001L10 8.00098L6 4.00098" stroke="#242424"/></svg>}
                </span>
                <h4 className='faq__question-title'>{el.title}</h4></div>
                {el.full?<p className='faq__question-text'>{el.text}</p>:<p style={{display:'none'}} className='faq__question-text'>{el.text}</p>}
            </div>
            )} */}
            </div>

        </section>
    );
};

export default Faq;