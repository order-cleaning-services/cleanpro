import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/scss';
import 'swiper/css/pagination';
import '../../../../../../styles/Cleaners.css';
import ButtonNavSwiper from '../ButtonNavSwiper';

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
				<div className="swiper swiper__wrapper">
					<SwiperSlide className='slide'>
						<div className="slide__title">
							<p className="slide__title-name">Имя Клинера 1</p>
							<div className="slide__rating">
								<p className="slide__mark">5,0</p>
								<img className="slide__star" src="./src/images/star.svg" alt="" />
							</div>
						</div>
						<img className="slide__img" src="./src/images/cleaner.webp" alt="" />
						<p className="slide__quantity">125 уборок</p>
						<Link className="slide__order" to="/">Заказать уборку</Link>
					</SwiperSlide>
					<SwiperSlide className='slide'>
						<div className="slide__title">
							<p className="slide__title-name">Имя Клинера 2</p>
							<div className="slide__rating">
								<p className="slide__mark">5,0</p>
								<img src="./src/images/star.svg" alt="" />
							</div>
						</div>
						<img className="slide__img" src="./src/images/cleaner.webp" alt="" />
						<p className="slide__quantity">125 уборок</p>
						<Link className="slide__order" to="/">Заказать уборку</Link>
					</SwiperSlide>
					<SwiperSlide className='slide'>
						<div className="slide__title">
							<p className="slide__title-name">Имя Клинера 3</p>
							<div className="slide__rating">
								<p className="slide__mark">5,0</p>
								<img src="./src/images/star.svg" alt="" />
							</div>
						</div>
						<img className="slide__img" src="./src/images/cleaner.webp" alt="" />
						<p className="slide__quantity">5 уборок</p>
						<Link className="slide__order" to="/">Заказать уборку</Link>
					</SwiperSlide>
					<SwiperSlide className='slide'>
						<div className="slide__title">
							<p className="slide__title-name">Имя Клинера 4</p>
							<div className="slide__rating">
								<p className="slide__mark">5,0</p>
								<img src="./src/images/star.svg" alt="" />
							</div>
						</div>
						<img className="slide__img" src="./src/images/cleaner.webp" alt="" />
						<p className="slide__quantity">125 уборок</p>
						<Link className="slide__order" to="/">Заказать уборку</Link>
					</SwiperSlide>
					<SwiperSlide className='slide'>
						<div className="slide__title">
							<p className="slide__title-name">Имя Клинера 5</p>
							<div className="slide__rating">
								<p className="slide__mark">5,0</p>
								<img src="./src/images/star.svg" alt="" />
							</div>
						</div>
						<img className="slide__img" src="./src/images/cleaner.webp" alt="" />
						<p className="slide__quantity">125 уборок</p>
						<Link className="slide__order" to="/">Заказать уборку</Link>
					</SwiperSlide>					
				</div>
				<ButtonNavSwiper />
			</Swiper>
		</div >
	);
}

export default Cleaners;