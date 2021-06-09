import React from 'react';
import cl from 'clsx';
import s from './SlideHero.module.scss';
import WhiteCard from '../../img/white-card.png';
import BlackCard from '../../img/black-card.png';

interface SlideHeroProps {
  className?: string;
  header?: string;
  text?: string;
  buttonText?: string;
}

const SlideHero = ({ className, header, text, buttonText }: SlideHeroProps) => (
  <div className={cl(s.hero, className)}>
    <div className={cl(s.background)}>
      <img className={cl(s.white_card)} src={WhiteCard} width={335} height={228} alt="card" />
      <img className={cl(s.black_card)} src={BlackCard} width={335} height={228} alt="card" />
      {header && <h1 className={cl(s.caption)}>{header}</h1>}
      {text && <p className={cl(s.text)}>{text}</p>}
      {buttonText && (
        <a href="#calculator">
          <div className={cl(s.button)}>{buttonText}</div>
        </a>
      )}
    </div>
  </div>
);

export default SlideHero;
