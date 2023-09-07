function Quantity(quantityСleaning) {
	const corda = quantityСleaning.toString();
	const ult = corda.charAt(corda.length-1);
	
	if (ult === '1' && !(quantityСleaning == '11')) {
		return `${quantityСleaning} уборка`
	} else if (ult === '2' 
	&& !(quantityСleaning == '12') 
	&& !(quantityСleaning == '112') 
	&& !(quantityСleaning == '212') 
	&& !(quantityСleaning == '312') 
	&& !(quantityСleaning == '412') 
	&& !(quantityСleaning == '512') 
	&& !(quantityСleaning == '612') 
	&& !(quantityСleaning == '712') 
	&& !(quantityСleaning == '812') 
	&& !(quantityСleaning == '912') 		
	|| ult === '3' 
	&& !(quantityСleaning == '13') 
	&& !(quantityСleaning == '113') 
	&& !(quantityСleaning == '213') 
	&& !(quantityСleaning == '313') 
	&& !(quantityСleaning == '413') 
	&& !(quantityСleaning == '513') 
	&& !(quantityСleaning == '613') 
	&& !(quantityСleaning == '713') 
	&& !(quantityСleaning == '813') 
	&& !(quantityСleaning == '913') 
	|| ult === '4' 
	&& !(quantityСleaning == '14')
	&& !(quantityСleaning == '114') 
	&& !(quantityСleaning == '214') 
	&& !(quantityСleaning == '314') 
	&& !(quantityСleaning == '414') 
	&& !(quantityСleaning == '514') 
	&& !(quantityСleaning == '614') 
	&& !(quantityСleaning == '714') 
	&& !(quantityСleaning == '814') 
	&& !(quantityСleaning == '914'))  {
		return `${quantityСleaning} уборки`
	} else {
		return `${quantityСleaning} уборок`
	}
}

export default Quantity;