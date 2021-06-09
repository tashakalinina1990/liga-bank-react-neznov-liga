import { ReactNode } from 'react';

export interface ITabComponent {
  header?: string;
  list?: string[];
  text?: string | { template: string; link: string };
  buttonCaption?: string;
  img?: string;
}

export type TabsTitle = 'Вклады' | 'Кредиты' | 'Страхование' | 'Онлайн-сервисы';
export type LoanTypes = 'Ипотечное кредитование' | 'Автомобильное кредитование';

export interface ITab {
  title: TabsTitle;
  component: ITabComponent;
}

export interface IDiscountCheckboxes {
  name: string;
  discount: number;
}

export const ItemsToScroll = 'calculator';

export interface ILoan {
  name: LoanTypes;
  minPrice: number;
  minCreditAmount: number;
  maxPrice: number;
  defaultPrice: number;
  step: number;
  minInitialFee: number;
  stepInitialFee: number;
  minLoanTerms: number;
  maxLoanTerms: number;
  discountCheckboxes?: IDiscountCheckboxes[];
  creditInputTitle: string;
  insuranceCheckboxNames?: string[];
  offerCaption: string;
  offerMessageCaption: string;
  loanCaption: string;
  minInterestRate: number;
  maxInterestRate: number;
  borderInterestRate?: number;
  borderInterestRatePercent?: number;
  allSpecialInterestRate?: number;
  specialInterestRate?: number;
}

export interface IContext {
  name: string;
  value: string | number;
}

export type Values = number | string | boolean;

export interface ISlide {
  slide: ReactNode;
  backgroundColor?: string;
}

export type changeSlidesAction = 'increase' | 'reduce';
