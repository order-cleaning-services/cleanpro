import './AboutPage.scss';

import About from './About/About';
import Cleaners from './Сleaners/Сleaners';

function AboutPage() {
	return (
		<div className="about-page">
				<h2 className="about-page__title">О компании</h2>
				<About />		
				<h2 className="about-page__title">Наши клинеры</h2>
				<Cleaners
				/>				
		</div>
	);
}

export default AboutPage;
