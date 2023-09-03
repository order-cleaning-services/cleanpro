import { useSelector, useDispatch } from 'react-redux';
import { handleClickEntry, handleClickRecovery, handleClickRegistration } from '../../store/slices/formEntrySlice';
import Button from '../Button/Button';
import Input from '../Input/Input';
import '../../../../styles/FormEntry.css';

function FormEntry() {

	const viewForm = useSelector(state => state.formEntrySlice.formView);
	const dispatch = useDispatch();

	const handleEntry = () => dispatch(handleClickEntry());
	const handleRecovery = () => dispatch(handleClickRecovery());
	const handleRegistration = () => dispatch(handleClickRegistration());


	return (
		<section className="form-entry">
			<form action="" className="form-entry__container">
				<div className="form-entry__content">
					{
						viewForm === 'registration'
							?
							<div className="form-entry__wrapper-title">
								<p
									className="form-entry__title form-entry__title_active">
									Регистрация
								</p>
								<p
									onClick={handleEntry}
									className="form-entry__title">
									Вход
								</p>
							</div>
							:
							viewForm === 'entry'
								?
								<div className="form-entry__wrapper-title">
									<p
										onClick={handleRegistration}
										className="form-entry__title ">
										Регистрация
									</p>
									<p
										className="form-entry__title form-entry__title_active">
										Вход
									</p>
								</div>
								:
								<p className="form-entry__title">Забыли пароль?</p>
					}

					<div className="form-entry__input-container">
						<Input
							key={`${viewForm}-email`}
							inputClassName="input"
							inputType="email"
							inputPlaceHolder="Email" />
						{(viewForm === "registration" || viewForm === "entry") && (
							<div className='form-enter__wrapper-input'>
								<Input
									key={`${viewForm}-password`}
									inputType="password"
									inputClassName="input input_type_password"
									inputPlaceHolder="Введите пароль"
								/>
							</div>
						)}

					</div>
					<div className="form-entry__button-container">
						{
							viewForm === 'registration'
								?
								<Button
									buttonText={'Зарегистрироваться'}
									buttonClassName="button indent button_disabled"
								/>
								:
								viewForm === "entry"
									?
									<Button
										buttonText={'Войти'}
										buttonClassName="button indent button_disabled"
									/>
									:
									<Button
										buttonText={'Восстановить пароль'}
										buttonClassName="button button__recovery button_disabled"
									/>
						}

					</div>
					{
						viewForm === 'registration'
							?
							<p className="form-entry__acceptance">
								Нажимая «Зарегистрироваться», я даю <span className="form-entry__acceptance-span">согласие на обработку персональных данных.</span></p>
							:
							viewForm === 'entry'
								?
								<p
									onClick={handleRecovery}
									className="form-entry__password-recovery">Забыли пароль?</p>
								:
								<p
									onClick={handleEntry}
									className="form-entry__password-recovery">Вспомнил пароль</p>
					}
				</div>
			</form>
		</section >
	);
}

export default FormEntry;
