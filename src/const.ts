import { ILoan, ITab } from './types';
import FbSvg from './img/icon-social-fb.svg';
import InstaSvg from './img/icon-social-insta.svg';
import TwitSvg from './img/icon-social-twit.svg';
import YouTubeSvg from './img/icon-social-youtube.svg';

export const Routes = {
  HOME: '/',
  ERROR404: '/404',
};

export const SocialIcons = [
  {
    title: 'Facebook',
    icon: FbSvg,
    link: Routes.ERROR404,
  },
  {
    title: 'Instagram',
    icon: InstaSvg,
    link: Routes.ERROR404,
  },
  {
    title: 'Twitter',
    icon: TwitSvg,
    link: Routes.ERROR404,
  },
  {
    title: 'YouTube',
    icon: YouTubeSvg,
    link: Routes.ERROR404,
  },
];

export const HeaderMenu = ['Услуги', 'Рассчитать кредит', 'Конвертер валют', 'Контакты'];

export const FooterMenu = ['Услуги', 'Рассчитать кредит', 'Контакты', 'Задать вопрос'];

export const Tabs: ITab[] = [
  {
    title: 'Вклады',
    component: {
      header: 'Вклады Лига Банка – это выгодная инвестиция в свое будущее',
      list: [
        'Проценты по вкладам до 7%',
        'Разнообразные условия',
        'Возможность ежемесячной капитализации или вывод процентов на банковскую карту',
      ],
      buttonCaption: 'Узнать подробнее',
    },
  },
  {
    title: 'Кредиты',
    component: {
      header: 'Лига Банк выдает кредиты под любые цели',
      list: ['Ипотечный кредит', 'Автокредит', 'Потребительский кредит'],
      text: {
        template:
          'Рассчитайте ежемесячный платеж и ставку по кредиту воспользовавшись нашим <link>кредитным калькулятором</link>',
        link: 'calculator',
      },
      buttonCaption: 'Узнать подробнее',
    },
  },
  {
    title: 'Страхование',
    component: {
      header: 'Лига Страхование — застрахуем все что захотите',
      list: ['Автомобильное страхование', 'Страхование жизни и здоровья', 'Страхование недвижимости'],
      buttonCaption: 'Узнать подробнее',
    },
  },
  {
    title: 'Онлайн-сервисы',
    component: {
      header: 'Лига Банк — это огромное количество онлайн-сервисов для вашего удобства',
      list: [
        'Мобильный банк, который всегда под рукой',
        'Приложение Лига-проездной позволит вам оплачивать билеты по всему миру',
      ],
      buttonCaption: 'Узнать подробнее',
    },
  },
];

export const DEFAULT_TAB = 0;

export const MapSettings = {
  center: {
    lat: 54.733334,
    lng: 56.0,
  },
  zoom: 5,
  markerSize: [31, 35],
  markers: [
    {
      lat: 55.753215,
      lng: 37.622504,
      title: 'Москва',
    },
    {
      lat: 55.796289,
      lng: 49.108795,
      title: 'Казань',
    },
    {
      lat: 51.533103,
      lng: 46.034158,
      title: 'Саратов',
    },
    {
      lat: 54.989342,
      lng: 73.368212,
      title: 'Омск',
    },
    {
      lat: 57.153033,
      lng: 65.534328,
      title: 'Тюмень',
    },
  ],
};

export const YOUR_API_KEY = 'AIzaSyDxtbrxOJ5bAuXXkBO28TVpbOnkr1RNGNg';
export const USERNAME_MAPS = 'alexbizplus';
export const ACCESS_TOKEN =
  'pk.eyJ1IjoiYWxleGJpenBsdXMiLCJhIjoiY2twN3kyMWFyMDR3eTJvbnhsYzBsYnN0biJ9.6ZPr9Uks4RpB0lqMjyoA-w';

export const Loans: ILoan[] = [
  {
    name: 'Ипотечное кредитование',
    minPrice: 1200000,
    minCreditAmount: 500000,
    maxPrice: 25000000,
    defaultPrice: 2000000,
    step: 100000,
    minInitialFee: 10,
    stepInitialFee: 10,
    minLoanTerms: 5,
    maxLoanTerms: 30,
    discountCheckboxes: [
      {
        name: 'Использовать материнский капитал',
        discount: 470000,
      },
    ],
    creditInputTitle: 'Стоимость недвижимости',
    offerCaption: 'Сумма ипотеки',
    offerMessageCaption: 'ипотечные кредиты',
    loanCaption: 'Ипотека',
    minInterestRate: 8.5,
    maxInterestRate: 9.4,
    borderInterestRatePercent: 15,
  },
  {
    name: 'Автомобильное кредитование',
    minPrice: 200000,
    minCreditAmount: 200000,
    maxPrice: 5000000,
    defaultPrice: 2000000,
    step: 50000,
    minInitialFee: 20,
    stepInitialFee: 5,
    minLoanTerms: 1,
    maxLoanTerms: 5,
    insuranceCheckboxNames: ['Оформить КАСКО в нашем банке', 'Оформить Страхование жизни в нашем банке'],
    creditInputTitle: 'Стоимость автомобиля',
    offerCaption: 'Сумма автокредита',
    offerMessageCaption: 'автокредиты',
    loanCaption: 'Автокредит',
    minInterestRate: 15,
    maxInterestRate: 16,
    borderInterestRate: 2000000,
    allSpecialInterestRate: 3.5,
    specialInterestRate: 8.5,
  },
];

export const REQUIRED_MONTHLY_INCOME_PERCENT = 45;

export const START_REQUEST_NUMBER = 10;
export const REQUEST_NUMBER_DIGITS = 4;

export const SELECT_PLACEHOLDER = 'Выберите цель кредита';
export const REFRESH_INTERVAL = 4000;

export const DESKTOP_WIDTH = 1024;
export const TABLET_WIDTH = 768;

export const STORE = 'LIGA_BANK_REACT';
export const USER_STORE = 'LIGA_BANK_REACT_USER';
