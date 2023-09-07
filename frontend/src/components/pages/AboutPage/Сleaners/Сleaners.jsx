import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/css/pagination';
import './Cleaners.scss';
// import Slide from './Slide/Slide';
import ButtonNavSwiper from '../ButtonNavSwiper';

function Cleaners(
	// {slides}
) {

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
					{/* {
								slides.map((slide) => {
									return <Slide
									key = {slide._id}
									slide={slide}
									/>
								})
								} */}
				</div>
				<ButtonNavSwiper />
			</Swiper>
		</div >
	);
}

export default Cleaners;