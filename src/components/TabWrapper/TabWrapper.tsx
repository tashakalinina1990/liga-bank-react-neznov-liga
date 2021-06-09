import React, { MouseEventHandler, TouchEventHandler, useState } from 'react';
import cl from 'clsx';
import { useHistory } from 'react-router';
import s from './TabWrapper.module.scss';
import { DEFAULT_TAB, Routes } from '../../const';
import { ITab } from '../../types';
import TabComponent from '../TabComponent/TabComponent';
import DefaultIcon from '../../img/icon-color-phone.svg';
import VaultIcon from '../../img/icon-vault.svg';
import CardsIcon from '../../img/icon-cards.svg';
import SecurityIcon from '../../img/icon-security.svg';
import CarOnMoneyImg from '../../img/car-on-money.png';
import LockerImg from '../../img/locker.png';
import PhoneImg from '../../img/phone-logo.png';

interface ITabsProps {
  tabs: Array<ITab>;
}

const TabWrapper: React.FC<ITabsProps> = (prop) => {
  const { tabs } = prop;
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<number>(DEFAULT_TAB);
  const [coordX, setCoordX] = useState<number | undefined>();

  const handleTabTitleClick: MouseEventHandler<HTMLButtonElement> = (evt) => {
    const currentTarget = evt.currentTarget as Element;
    if (currentTarget.id) {
      setActiveTab(+currentTarget.id);
    }
  };

  const handleTabButtonClick = () => history.push(Routes.ERROR404);

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (evt) => {
    setCoordX(evt.touches[0].clientX);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (evt) => {
    if (coordX && evt.changedTouches[0].clientX > coordX) setActiveTab(activeTab > 1 ? activeTab - 1 : 0);
    if (coordX && evt.changedTouches[0].clientX < coordX)
      setActiveTab(activeTab < tabs.length - 1 ? activeTab + 1 : activeTab);
  };

  const setTabIcon = (title: string) => {
    let icon;
    let iconWidth;
    let iconHeight;

    switch (title) {
      case 'Вклады':
        icon = VaultIcon;
        iconWidth = 34;
        iconHeight = 33;
        break;

      case 'Кредиты':
        icon = CardsIcon;
        iconWidth = 34;
        iconHeight = 30;
        break;

      case 'Страхование':
        icon = SecurityIcon;
        iconWidth = 28;
        iconHeight = 34;
        break;

      default:
        icon = DefaultIcon;
        iconWidth = 20;
        iconHeight = 34;
        break;
    }

    return <img src={icon} width={iconWidth} height={iconHeight} alt="icon" />;
  };

  const addTabImg = (tab: ITab) => {
    let img;

    switch (tab.title) {
      case 'Кредиты':
        img = CarOnMoneyImg;
        break;

      case 'Страхование':
        img = LockerImg;
        break;

      case 'Онлайн-сервисы':
        img = PhoneImg;
        break;

      default:
        img = null;
        break;
    }

    return { ...tab.component, img };
  };

  return (
    <div className={cl(s.tabWrap)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={cl(s.tabList)} id="tabList">
        {tabs.length !== 0 &&
          tabs.map((tab, i) => (
            <button
              type="button"
              className={cl(s.button, {
                [s.button__active]: i === activeTab,
              })}
              id={i.toString()}
              key={tab.title}
              onClick={handleTabTitleClick}>
              {setTabIcon(tab.title)}
              {tab.title}
            </button>
          ))}
      </div>
      <TabComponent component={addTabImg(tabs[activeTab])} onClick={handleTabButtonClick} />
      {tabs.length !== 0 && (
        <div className={cl(s.paggination)}>
          {tabs.map((item, i) => (
            <div className={cl(s.dot, { [s.dot__active]: i === activeTab })} key={`${item.title}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabWrapper;
