import React from 'react';

import '../../../../styles/Button.css';

function Button(props) {

	return (
		<button 
	className={props.buttonClassName}>{props.buttonText}
	</button>

	);
}

export default Button;