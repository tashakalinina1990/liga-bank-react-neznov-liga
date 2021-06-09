import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cl from 'clsx';
import s from './Header.module.scss';
import { Routes, HeaderMenu } from '../../const';
import LogoSvg from '../../img/icon-logo.svg';
import LogoTextSvg from '../../img/icon-logo-text.svg';
import LoginSvg from '../../img/icon-login.svg';
import MenuSvg from '../../img/icon-menu.svg';
import CloseSvg from '../../img/icon-close.svg';

interface IHeader {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: IHeader) => {
  const [isShowNav, setIsShowNav] = useState(false);
  const handleLoginClick = () => {
    setIsShowNav(false);
    onLoginClick();
  };

  return (
    <header className={cl(s.headerWrap)}>
      <div className={cl(s.header, { [s.header__mobile]: isShowNav })}>
        <button className={cl(s.menu)} type="button" onClick={() => setIsShowNav(!isShowNav)}>
          <img src={MenuSvg} width={16} height={10} alt="menu" />
        </button>
        {isShowNav && (
          <button className={cl(s.closeMenu)} type="button" onClick={() => setIsShowNav(false)}>
            <img src={CloseSvg} width={13} height={13} alt="close" />
          </button>
        )}
        <Link className={cl(s.logoWrap)} to={Routes.HOME}>
          <img className={cl(s.logo)} src={LogoSvg} width={30} height={27} alt="logo" />
          <img src={LogoTextSvg} width={112} height={16} alt="logo" />
        </Link>
        <nav className={cl(s.nav, { [s.nav__mobile]: isShowNav })}>
          {HeaderMenu.map((item) => (
            <Link className={cl(s.menuItem)} key={item} to={Routes.ERROR404}>
              {item}
            </Link>
          ))}
        </nav>
        <button className={cl(s.login, { [s.login__mobile]: isShowNav })} onClick={handleLoginClick} type="button">
          <img src={LoginSvg} width={20} height={22} alt="login" />
          <span>Войти в Интернет-банк</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
