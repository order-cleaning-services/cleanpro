import React, { useState } from 'react';
import 'FormEnter.scss';

function FormEnter() {
	const [activeRegistration, setActiveRegistration] = useState(true);
	const [activeEnter, setActiveEnter] = useState(false);
	const [activeRecovery, setActiveRecovery] = useState(false);
	const [activeTitle, setActiveTitle] = useState(false);

	const handleClickEnter = () => {
		setActiveRegistration(false);
		setActiveEnter(true);
		setActiveRecovery(false);
		setActiveTitle(false);
	}

	const handleClickRegistration = () => {
		setActiveRegistration(true);
		setActiveEnter(false);
		setActiveRecovery(false);
		setActiveTitle(false);
	}

	const handleRecovery = () => {
		setActiveRegistration(false);
		setActiveEnter(false);
		setActiveRecovery(true);
		setActiveTitle(true);
	}

	return (
		<div className="form-enter">
			<form action="" className="form-enter__container">
				<div className="form-enter__content">
					<div className={`form-enter__wrapper-title ${activeTitle ? 'visibility' : ''}`}>
						<p
							onClick={handleClickRegistration}
							className={`form-enter__title ${activeRegistration ? 'form-enter__title_active' : ''}`}>
							Регистрация
						</p>
						<p
							onClick={handleClickEnter}
							className={`form-enter__title ${activeEnter ? 'form-enter__title_active' : ''}`}>
							Вход
						</p>
					</div>
					<p className={`form-enter__title ${activeRecovery ? '' : 'visibility'}`}>Забыли пароль?</p>
					<div className="form-enter__input-container">
						<input className="form-enter__input" type="email" placeholder="Email" />
						<div className={`form-enter__wrapper-input ${activeRecovery ? 'visibility' : ''}`}>
							<input type="password" className="form-enter__input form-enter__input_type_password" placeholder="Введите пароль" required autoComplete='off' />
						</div>
					</div>

					<button className={`form-enter__button form-enter__button_disabled ${activeRegistration ? '' : 'visibility'}`}>Зарегистрироваться</button>
					<button className={`form-enter__button ${activeEnter ? '' : 'visibility'}`}>Войти</button>


					<button className={`form-enter__button form-enter__button_disabled ${activeRecovery ? '' : 'visibility'}`}>Восстановить пароль</button>


					<p className={`form-enter__acceptance ${activeRegistration ? '' : 'visibility'}`}>Нажимая «Зарегистрироваться», я даю <span className="form-enter__acceptance-span">согласие на обработку персональных данных.</span></p>
					<p
						onClick={handleRecovery}
						className={`form-enter__password-recovery ${activeEnter ? '' : 'visibility'}`}>Забыли пароль?</p>

					<p
						onClick={handleClickEnter}
						className={`form-enter__password-recovery ${activeRecovery ? '' : 'visibility'}`}>Вспомнил пароль</p>
				</div>
			</form>
		</div>
	);
}

export default FormEnter;