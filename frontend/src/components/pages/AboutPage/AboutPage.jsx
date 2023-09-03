import '../../../../../styles/AboutPage.css';

import Title from './Title/Title';
import About from './About/About';
import Cleaners from './Сleaners/Сleaners';

function AboutPage() {

	return (
		<div className="about-page">
				<Title titleText={"О компании"} />
				<About />		
				<Title titleText={"Наши клинеры"} />	
				<Cleaners />				
		</div>
	);
}

export default AboutPage;
