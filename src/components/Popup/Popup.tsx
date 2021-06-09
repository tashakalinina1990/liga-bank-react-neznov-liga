/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ReactNode } from 'react';
import cl from 'clsx';
import { nanoid } from 'nanoid';
import s from './Popup.module.scss';

interface IPopup {
  isShow: boolean;
  children: ReactNode;
  className?: string;
  classNameClose?: string;
  onClose: () => void;
}

const popupCloseId = nanoid(11);

const Popup = ({ isShow, children, className, classNameClose, onClose }: IPopup) => (
  <>
    {isShow && (
      <div className={cl(s.popupWrap)}>
        <div className={cl(s.popup, className)}>
          <>
            <button
              className={cl(s.closeButton, classNameClose)}
              type="button"
              id={popupCloseId}
              onClick={() => onClose()}
            />
            {children}
          </>
        </div>
      </div>
    )}
  </>
);

export default Popup;
