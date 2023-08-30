import './Materials.scss'
import material1 from '../../images/material1.png'
import material2 from '../../images/material2.png'
import material3 from '../../images/material3.png'
const Materials = () => {

    // let cards = [{
    //     id: 1,
    //     title: 'Средства и материалы',
    //     img: material1,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis. Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis.'
    // },
    // {
    //     id: 2,
    //     title: 'Профессиональные средства',
    //     img: material2,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis.'
    // },
    // {
    //     id: 3,
    //     title: 'Гипоаллергенные составы',
    //     img: material3,
    //     text: 'Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis.'
    // }]

    return (
        <section className='materials'>
            <h3 className='materials__title'>Средства и материалы</h3>
            <div className='materials__cards'>
{/* 
                {cards.map(el => 
                    <div key={el.id} className='materials__card'>
                     <p className='materials__card-title'>{el.title}</p>
                     <img className='materials__card-img' src={el.img} alt="" />
                     <p className='materials__card-text'>{el.text}</p>
                     </div>
                    
                )} */}

                <div className='materials__card full'>
                    <p className='materials__card-title'>Специальная техника</p>
                    <img className='materials__card-img full-img' src={material1} alt="" />
                    <p className='materials__card-text full-text'>Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis. Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis. </p>
                </div>

                <div className='materials__card-section'>

                <div className='materials__card '>
                    <p className='materials__card-title'>Профессиональные средства</p>
                    <img className='materials__card-img' src={material2} alt="" />
                    <p className='materials__card-text'>Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis.</p>
                </div>
                <div className='materials__card '>
                    <p className='materials__card-title'>Гипоаллергенные составы</p>
                    <img className='materials__card-img' src={material3} alt="" />
                    <p className='materials__card-text'>Lorem ipsum dolor sit amet consectetur. Sed posuere sit nec ullamcorper cursus tempus massa cum nulla. Ac praesent magnis amet lobortis erat facilisis.</p>
                </div>


                </div>
               
            </div>
        </section>
    );
};

export default Materials;