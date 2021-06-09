/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import cl from 'clsx';
import { nanoid } from 'nanoid';
import s from './InputTypeNumber.module.scss';
import { splitPrice } from '../../utils/utils';

interface IInputTypeNumber {
  onChange: (value: number) => void;
  onIncrease: (event: React.MouseEvent<HTMLInputElement>) => void;
  onReduce: (event: React.MouseEvent<HTMLInputElement>) => void;
  units?: string;
  textAbove?: string;
  textBelow?: string;
  value: number;
  minValue: number;
  maxValue: number;
}

const defaultUnits = 'of smth';

const InputTypeNumber = ({
  onChange,
  units,
  textAbove,
  textBelow,
  value,
  onIncrease,
  onReduce,
  minValue,
  maxValue,
}: IInputTypeNumber) => {
  const [inputValue, setInputValue] = useState<number | string>(value);
  const [isShowError, setIsShowError] = useState(false);
  const maxDigits = maxValue.toString(10).length;
  const inputId = nanoid(11);
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = evt.currentTarget;
    value = value.replace(/[^\d]*/g, '');

    if (value.length === 2) {
      value = value.replace(/[0]{1}([^0])/, (_match: string, p1: string) => p1);
    }

    if (value.length > maxDigits) {
      return;
    }

    if (value.length <= maxDigits) {
      if (+value < minValue || +value > maxValue) {
        setIsShowError(true);
      }
      setInputValue(value);
      onChange(+value);
    }
  };

  useEffect(() => {
    setInputValue(value);
    setIsShowError(false);
  }, [value]);

  return (
    <div className={cl(s.inputWrap)}>
      <span className={cl(s.textAbove)}>{textAbove}</span>
      <div
        className={cl(s.inputTypeNumber, {
          [s.inputTypeNumber__error]: isShowError,
        })}>
        <input type="button" className="display-none" id={`${inputId}-button-minus`} onClick={onReduce} />
        <label htmlFor={`${inputId}-button-minus`} className={cl(s.numberButtonAction)} />
        <input
          className={cl(s.input)}
          id={inputId}
          type="text"
          autoComplete="off"
          value={splitPrice(inputValue)}
          onChange={handleInputChange}
        />
        <div className={cl(s.units)}>{units || defaultUnits}</div>
        <input type="button" className="display-none" id={`${inputId}-button-plus`} onClick={onIncrease} />
        <label htmlFor={`${inputId}-button-plus`} className={cl(s.numberButtonAction, s.numberButtonAction__plus)} />
        {isShowError && <span className={cl(s.error)}>Некорректное значение</span>}
      </div>
      <span className={cl(s.textBelow)}>{textBelow}</span>
    </div>
  );
};

export default InputTypeNumber;
