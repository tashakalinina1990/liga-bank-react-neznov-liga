import React from 'react';
import { Link } from 'react-router-dom';
import cl from 'clsx';
import s from './Footer.module.scss';
import { FooterMenu, Routes, SocialIcons } from '../../const';
import LogoSvg from '../../img/icon-logo.svg';
import LogoTextSvg from '../../img/icon-logo-text.svg';
import PhoneSvg from '../../img/icon-phone.svg';
import PhoneOldSvg from '../../img/icon-phone-old.svg';

const Footer = () => (
  <footer className={cl(s.footerWrap)}>
    <div className={cl(s.footer)}>
      <Link className={cl(s.logoWrap)} to={Routes.HOME}>
        <img className={cl(s.logo)} src={LogoSvg} width={30} height={27} alt="logo" />
        <img src={LogoTextSvg} width={112} height={16} alt="logo" />
      </Link>
      <div className={cl(s.copyright)}>
        <p>150015, г. Москва, ул. Московская, д. 32 Генеральная лицензия Банка России №1050</p>
        <span>Ⓒ Лига Банк, 2021</span>
      </div>
      <nav className={cl(s.nav)}>
        {FooterMenu.map((item) => (
          <Link className={cl(s.menuItem)} key={item} to={Routes.ERROR404}>
            {item}
          </Link>
        ))}
      </nav>
      <div className={cl(s.telColumn, s.telColumn__mobile)}>
        <img className={cl(s.telIcon)} src={PhoneSvg} alt="phone" />
        <a className={cl(s.telNumber)} href="tel:*0904">
          *0904
        </a>
        <p className={cl(s.telText)}>Бесплатно для абонентов МТС, Билайн, Мегафон, Теле2</p>
      </div>
      <div className={cl(s.telColumn, s.telColumn__tel)}>
        <img className={cl(s.telIcon)} src={PhoneOldSvg} alt="phone" />
        <a className={cl(s.telNumber)} href="tel:+78001112233">
          8 800 111 22 33
        </a>
        <p className={cl(s.telText)}>Бесплатный для всех городов России</p>
      </div>
      <ul className={cl(s.socialColumn)}>
        {SocialIcons.map((item, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`item${i}`} className={cl(s.socialItem)}>
            <Link to={item.link}>
              <img src={item.icon} alt="logo" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
