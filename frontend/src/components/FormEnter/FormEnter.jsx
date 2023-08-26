import React, { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import '../../../../styles/FormEnter.css';

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

	const handleClickRecovery = () => {
		setActiveRegistration(false);
		setActiveEnter(false);
		setActiveRecovery(true);
		setActiveTitle(true);
	}

	return (
		<section className="form-enter">
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
						<Input
							inputType={'email'}
							inputClassName={'input'}
							inputPlaceHolder={"Email"}
						/>

						<div className={`form-enter__wrapper-input ${activeRecovery ? 'visibility' : ''}`}>

							<Input
								inputType={'password'}
								inputClassName={'input input_type_password'}
								inputPlaceHolder={"Введите пароль"}
							/>
						</div>
						{/* <div className={`form-enter__wrapper-input ${activeRecovery ? 'visibility' : ''}`}>
							<Input
								inputType={'password'}
								inputClassName={'input input_type_password'}
								inputPlaceHolder={"Повторите пароль"}
							/>
						</div> */}
					</div>
					<div className="form-enter__button-container">
						<Button
							buttonText={'Зарегистрироваться'}
							buttonClassName={`button indent button_disabled ${activeRegistration ? '' : 'visibility'}`}
						/>
						<Button
							buttonText={'Войти'}
							buttonClassName={`button indent ${activeEnter ? '' : 'visibility'}`}
						/>
					</div>
					<Button
						buttonText={'Восстановить пароль'}
						buttonClassName={`button button__recovery ${activeRecovery ? '' : 'visibility'}`}
					/>
					<p className={`form-enter__acceptance ${activeRegistration ? '' : 'visibility'}`}>Нажимая «Зарегистрироваться», я даю <span className="form-enter__acceptance-span">согласие на обработку персональных данных.</span></p>
					<p
						onClick={handleClickRecovery}
						className={`form-enter__password-recovery ${activeEnter ? '' : 'visibility'}`}>Забыли пароль?</p>

					<p
						onClick={handleClickEnter}
						className={`form-enter__password-recovery ${activeRecovery ? '' : 'visibility'}`}>Вспомнил пароль</p>
				</div>
			</form>
		</section>
	);
}

export default FormEnter;