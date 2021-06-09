import React, { useEffect, useState } from 'react';
import cl from 'clsx';
import s from './InputTypeRange.module.scss';
import { splitPrice } from '../../utils/utils';

interface IInputTypeRange {
  onChange: (value: number) => void;
  units?: string;
  textAbove?: string;
  minRangeText?: string;
  maxRangeText?: string;
  value: number;
  minValue: number;
  maxValue: number;
  showExceedMaxValue?: (value: boolean) => void;
  step: number;
}

const defaultUnits = 'of smth';

const InputTypeRange = ({
  onChange,
  units,
  textAbove,
  minValue,
  maxValue,
  value,
  minRangeText,
  maxRangeText,
  step,
  showExceedMaxValue,
}: IInputTypeRange) => {
  const [inputValue, setInputValue] = useState<number | string>(value);
  const [isShowError, setIsShowError] = useState(false);
  const maxDigits = maxValue.toString(10).length;

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
      if (+value > maxValue && showExceedMaxValue) {
        showExceedMaxValue(true);
      }
      if (+value <= maxValue && showExceedMaxValue) {
        showExceedMaxValue(false);
      }
      setInputValue(value);
      onChange(+value);
    }
  };

  const handleRangeChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;
    setInputValue(value);
    onChange(+value);
  };

  useEffect(() => {
    setInputValue(value);
    setIsShowError(false);
    if (value <= maxValue && showExceedMaxValue) {
      showExceedMaxValue(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={cl(s.inputWrap)}>
      <span className={cl(s.textAbove)}>{textAbove}</span>
      <div
        className={cl(s.InputTypeRange, {
          [s.InputTypeRange__error]: isShowError,
        })}>
        <input
          className={cl(s.input)}
          type="text"
          autoComplete="off"
          value={splitPrice(inputValue)}
          onChange={handleInputChange}
        />
        <div className={cl(s.units)}>{units || defaultUnits}</div>
        {isShowError && <span className={cl(s.error)}>Некорректное значение</span>}
      </div>
      <input
        className={cl(s.range)}
        type="range"
        min={minValue}
        value={inputValue}
        max={maxValue}
        step={step}
        onChange={handleRangeChange}
      />
      <div className={cl(s.rangeText)}>
        <span className={cl(s.minRangeText)}>{minRangeText || ''}</span>
        <span className={cl(s.maxRangeText)}>{maxRangeText || ''}</span>
      </div>
    </div>
  );
};

export default InputTypeRange;
