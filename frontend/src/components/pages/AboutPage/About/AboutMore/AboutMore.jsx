// import React from 'react';

function AboutMore({ title, subTitle, src }) {

return (
<div className="about__more-body">
					<img className="about__more-img" src={src} alt={title} />
					<p className="about__more-title">{title}</p>
					<p className="about__more-subtitle">{subTitle}</p>
				</div>
);
}

export default AboutMore;