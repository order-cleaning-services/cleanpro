import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/scss';
import 'swiper/css/pagination';
import './Cleaners.scss';
import './Slider.scss'

import cleanersData from '../../utils/cleaningData'
import ButtonNavSwiper from '../ButtonNavSwiper/ButtonNavSwiper';
import calcCleaningQuantity from '../../utils/calcCleaningQuantity'

function Cleaners() {

	return (
		<div className="cleaners">
			
			<Swiper
				spaceBetween={32}
				slidesPerView={4}
				centeredSlides={false}
				grabCursor={true}
				modules={[Navigation]}
				className="mySwiper"
			>
				{
					cleanersData.map((slide) => {
						console.log(slide.quantity)
						return <SwiperSlide key={slide.id} className='slide'>
							<div className="slide__title">
								<p className="slide__title-name">{slide.name}</p>
								<div className="slide__rating">
									<p className="slide__mark">{slide.mark}</p>
									<img className="slide__star" src="./src/images/star.svg" alt="" />
								</div>
							</div>
							<img className="slide__img" src={slide.image} alt={slide.name} />
							<p className="slide__quantity">
							{calcCleaningQuantity(slide.quantity)}
							</p>	
							<Link className="slide__order" to="/">Заказать уборку</Link>
						</SwiperSlide>
					})
				}
				< ButtonNavSwiper />
			</Swiper>
		</div >
	);
}

export default Cleaners;