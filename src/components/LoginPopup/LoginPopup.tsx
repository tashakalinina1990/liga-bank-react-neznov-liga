/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEventHandler, FormEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import cl from 'clsx';
import { Link } from 'react-router-dom';
import s from './LoginPopup.module.scss';
import LogoSvg from '../../img/icon-logo.svg';
import LogoTextSvg from '../../img/icon-logo-text.svg';
import LogoBankSvg from '../../img/icon-logo-bank.svg';
import ClosedEyeSvg from '../../img/icon-closed-eye.svg';
import { Routes, USER_STORE } from '../../const';

interface ILoginPopup {
  onSubmit: () => void;
}

const LoginPopup = ({ onSubmit }: ILoginPopup) => {
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const loginInputRef = useRef<HTMLInputElement | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [inputLoginValue, setInputLoginValue] = useState<string>('');
  const [inputPasswordValue, setInputPasswordValue] = useState<string>('');
  const handleInputLoginChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.currentTarget;
    setInputLoginValue(value);
  };
  const handleInputPasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.currentTarget;
    setInputPasswordValue(value);
  };
  const handleShowPasswordDown = () => {
    passwordInputRef?.current?.setAttribute('type', 'text');
    setIsShowPassword(true);
    passwordInputRef?.current?.focus();
  };
  const handleShowPasswordUp = () => {
    passwordInputRef?.current?.setAttribute('type', 'password');
    setIsShowPassword(false);
    passwordInputRef?.current?.focus();
  };
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    if (localStorage.getItem(USER_STORE)) {
      localStorage.removeItem(USER_STORE);
    }
    localStorage.setItem(
      USER_STORE,
      JSON.stringify({
        login: inputLoginValue,
        password: inputPasswordValue,
      }),
    );
    onSubmit();
  };

  useEffect(() => {
    loginInputRef?.current?.focus();
    Object.entries(JSON.parse(localStorage.getItem(USER_STORE) || "'login': '', 'password': ''")).map(
      // eslint-disable-next-line array-callback-return
      ([itemKey, itemValue]: [string, unknown]) => {
        if (itemKey === 'login') setInputLoginValue(itemValue as string);
        if (itemKey === 'password') setInputPasswordValue(itemValue as string);
      },
    );
  }, []);

  return (
    <form className={cl(s.wrap)} onSubmit={handleFormSubmit}>
      <div className={cl(s.logoWrap)}>
        <img className={cl(s.logo)} src={LogoSvg} width={30} height={27} alt="logo" />
        <img className={cl(s.logoText)} src={LogoTextSvg} width={112} height={16} alt="logo" />
        <img className={cl(s.logoBank)} src={LogoBankSvg} width={82} height={8} alt="logo" />
      </div>
      <label className={cl(s.login)}>
        <span className={cl(s.inputTitle)}>Логин</span>
        <input
          className={cl(s.input)}
          type="text"
          value={inputLoginValue}
          onChange={handleInputLoginChange}
          ref={loginInputRef as RefObject<HTMLInputElement>}
        />
      </label>
      <label className={cl(s.password)}>
        <span className={cl(s.inputTitle)}>Пароль</span>
        <input
          className={cl(s.input)}
          type="password"
          autoComplete="current-password"
          value={inputPasswordValue}
          onChange={handleInputPasswordChange}
          ref={passwordInputRef as RefObject<HTMLInputElement>}
        />
        <div className={cl(s.showPassword)} onPointerDown={handleShowPasswordDown} onPointerUp={handleShowPasswordUp}>
          <img
            className={cl(s.showPasswordImg, {
              [s.showPasswordImg__rotate]: isShowPassword,
            })}
            src={ClosedEyeSvg}
            width={22}
            height={12}
            alt="show password"
          />
        </div>
      </label>
      <Link className={cl(s.showPasswordButton)} to={Routes.ERROR404}>
        Забыли пароль?
      </Link>
      <button type="submit" className={cl(s.button)}>
        Войти
      </button>
    </form>
  );
};

export default LoginPopup;
