import React from 'react';
import cl from 'clsx';
import s from './CheckoutForm.module.scss';
import { IContext } from '../../types';

interface ICheckoutForm {
  className?: string;
  onSubmit: () => void;
  context: IContext[];
}

const CheckoutForm = ({ className, onSubmit, context }: ICheckoutForm) => {
  const handleButtonClick = () => {
    onSubmit();
  };

  return (
    <div className={cl(s.checkoutForm, className)}>
      <h3 className={cl(s.checkoutCaption)}>Наше предложение</h3>
      <form className={cl(s.checkoutTextWrap)}>
        {context.map((item, i) => (
          <div className={cl(s.checkoutTextContainer)} key={item.name}>
            <span className={cl(s.checkoutText)}>{item.value}</span>
            <span className={cl(s.checkoutText__small)}>{item.name}</span>
          </div>
        ))}
      </form>
      <button className={cl(s.button)} type="button" onClick={handleButtonClick}>
        Оформить заявку
      </button>
    </div>
  );
};

export default CheckoutForm;
