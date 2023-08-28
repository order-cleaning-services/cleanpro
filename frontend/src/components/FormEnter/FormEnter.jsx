import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import Input from "../Input/Input";
import Button from "../Button/Button";

import "../../../../styles/FormEnter.css";

function FormEnter() {
  const [activeRegistration, setActiveRegistration] = useState(true);
  const [activeEnter, setActiveEnter] = useState(false);
  const [activeRecovery, setActiveRecovery] = useState(false);
  const [activeTitle, setActiveTitle] = useState(false);

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleClickEnter = () => {
    setActiveRegistration(false);
    setActiveEnter(true);
    setActiveRecovery(false);
    setActiveTitle(false);
  };

  const handleClickRegistration = () => {
    setActiveRegistration(true);
    setActiveEnter(false);
    setActiveRecovery(false);
    setActiveTitle(false);
  };

  const handleClickRecovery = () => {
    setActiveRegistration(false);
    setActiveEnter(false);
    setActiveRecovery(true);
    setActiveTitle(true);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="form-enter">
      <form
        action=""
        className="form-enter__container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-enter__content">
          <div
            className={`form-enter__wrapper-title ${
              activeTitle ? "visibility" : ""
            }`}
          >
            <p
              onClick={handleClickRegistration}
              className={`form-enter__title ${
                activeRegistration ? "form-enter__title_active" : ""
              }`}
            >
              Регистрация
            </p>
            <p
              onClick={handleClickEnter}
              className={`form-enter__title ${
                activeEnter ? "form-enter__title_active" : ""
              }`}
            >
              Вход
            </p>
          </div>
          <p
            className={`form-enter__title ${
              activeRecovery ? "" : "visibility"
            }`}
          >
            Забыли пароль?
          </p>
          <div className="form-enter__input-container">
            <Controller
              control={control}
              rules={{
                required: true,
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								}
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  inputType={"email"}
                  inputClassName={"input"}
                  inputPlaceHolder={"Email"}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            <div
              className={`form-enter__wrapper-input ${
                activeRecovery ? "visibility" : ""
              }`}
            >
              <Controller
                control={control}
                rules={{
                  required: true,
									maxLength: 16,
									minLength: 4
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputType={"password"}
                    inputClassName={"input input_type_password"}
                    inputPlaceHolder={"Введите пароль"}
                    onChange={onChange}
                    value={value}
                  />
                )}
                name="password"
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
              buttonText={"Зарегистрироваться"}
              buttonClassName={`button indent ${
                activeRegistration ? "" : "visibility"
              }`}
							isValid={isValid}
              type={'submit'} 
            />
            <Button
              buttonText={"Войти"}
              buttonClassName={`button indent ${
                activeEnter ? "" : "visibility"
              }`}
							isValid={isValid}
            />
          </div>
          <Button
            buttonText={"Восстановить пароль"}
            buttonClassName={`button button__recovery ${
              activeRecovery ? "" : "visibility"
            }`}
          />
          <p
            className={`form-enter__acceptance ${
              activeRegistration ? "" : "visibility"
            }`}
          >
            Нажимая «Зарегистрироваться», я даю{" "}
            <span className="form-enter__acceptance-span">
              согласие на обработку персональных данных.
            </span>
          </p>
          <p
            onClick={handleClickRecovery}
            className={`form-enter__password-recovery ${
              activeEnter ? "" : "visibility"
            }`}
          >
            Забыли пароль?
          </p>

          <p
            onClick={handleClickEnter}
            className={`form-enter__password-recovery ${
              activeRecovery ? "" : "visibility"
            }`}
          >
            Вспомнил пароль
          </p>
        </div>
      </form>
    </section>
  );
}

export default FormEnter;
