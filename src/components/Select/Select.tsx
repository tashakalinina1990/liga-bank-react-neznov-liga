import React, { MouseEventHandler, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cl from 'clsx';
import s from './Select.module.scss';
import ChevronImg from '../../img/icon-chevron.svg';

interface ISelect {
  selectNameId: string;
  options: string[];
  onClick: (e: string) => void;
  className?: string;
  value: string;
}

const Select = observer(({ selectNameId, options, onClick, className, value }: ISelect) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [selectName, setSelectName] = useState(value);

  const handleSelectOptionsChange: MouseEventHandler<HTMLDivElement> = (evt) => {
    const target = evt.target as Element;

    if (target.id && target.id !== selectNameId && target.id !== 'selectIcon') {
      onClick(target.id);
    }

    if (target.id === selectNameId || target.id === 'selectIcon') {
      setIsSelectFocused(!isSelectFocused);
    }
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(true);
  };

  const handleSelectBlur = () => {
    setIsSelectFocused(false);
  };

  useEffect(() => {
    setSelectName(value);
  }, [value]);

  return (
    <div className={cl(s.select, className)} onMouseDown={handleSelectOptionsChange} role="button" tabIndex={0}>
      <input
        className={cl(s.selectLabel)}
        id={selectNameId}
        type="text"
        value={selectName}
        onFocus={handleSelectFocus}
        onBlur={handleSelectBlur}
        readOnly
      />
      <img
        className={cl(s.selectIcon, {
          [s.selectIcon__rotate]: isSelectFocused,
        })}
        src={ChevronImg}
        width={18}
        height={11}
        id="selectIcon"
        alt="select icon"
      />
      {isSelectFocused && (
        <ul className={cl(s.selectList)}>
          {options.map((option, i) => (
            <li className={cl(s.label)} id={option} key={option}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default Select;
