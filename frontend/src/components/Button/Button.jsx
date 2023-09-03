import React from 'react';

import '../../../../styles/Button.css';

function Button({ buttonClassName, buttonText }) {

	return (
		<button 
	className={buttonClassName}>{buttonText}
	</button>

	);
}

export default Button;