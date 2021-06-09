import React from 'react';
import cl from 'clsx';
import s from './SlideRegular.module.scss';

interface SlideRegularProps {
  className?: string;
  header?: string;
  text?: string;
  buttonText?: string;
  img?: string;
}

const SlideRegular = ({ className, header, text, buttonText, img }: SlideRegularProps) => (
  <div className={cl(s.slideWrap)}>
    <div className={cl(s.slide, className)} style={{ backgroundImage: `url(${img})` }}>
      {header && <h1 className={cl(s.caption)}>{header}</h1>}
      {text && <p className={cl(s.text)}>{text}</p>}
      {buttonText && (
        <a href="#map">
          <div className={cl(s.button)}>{buttonText}</div>
        </a>
      )}
    </div>
  </div>
);

export default SlideRegular;
