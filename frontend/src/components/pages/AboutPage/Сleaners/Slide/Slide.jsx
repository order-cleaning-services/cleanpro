import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

function Slide({ 
	slide
}) {

	return (
		<SwiperSlide className='slide'>
			<div className="slide__title">
				<p className="slide__title-name">{slide.name}</p>
				<div className="slide__rating">
					<p className="slide__mark">{slide.mark}</p>
					<img className="slide__star" src="./src/images/star.svg" alt="" />
				</div>
			</div>
			<img className="slide__img" src={slide.image} alt={slide.name} />
			<p className="slide__quantity">{slide.quantity}</p>
			<Link className="slide__order" to="/">Заказать уборку</Link>
		</SwiperSlide>
	);
}

export default Slide;