import { makeAutoObservable } from 'mobx';
import { IDiscountCheckboxes, LoanTypes, Values } from '../types';
import { Loans, REQUIRED_MONTHLY_INCOME_PERCENT } from '../const';

export default class LoanCalculatorStore {
  private loanType: LoanTypes | null = null;

  private price: number = 0; // Стоимость объекта кредитования

  private initialFee: number = 0; // Первоначальный взнос

  private loanTerms: number = 0; // Срок кредита

  private loanOffer: number = 0; // Сумма кредита

  private interestRate: number = 0; // Процентная ставка

  private monthlyPayment: number = 0; // Ежемесячный платеж

  private requiredMonthlyIncome: number = 0; // Необходимый ежемесячный доход

  private discount: number = 0;

  private insuranceDiscounts: number = 0;

  discountCheckboxes: IDiscountCheckboxes[] = [];

  insuranceCheckboxNames: string[] = [];

  minPrice: number = 0;

  maxPrice: number = 0;

  defaultPrice: number = 0;

  step: number = 0;

  minInitialFee: number = 0;

  minInitialFeePercent: number = 0;

  stepInitialFee: number = 0;

  stepInitialFeePercent: number = 0;

  maxInitialFee: number = 1;

  minCreditAmount: number = 0;

  minLoanTerms: number = 0;

  maxLoanTerms: number = 0;

  minInterestRate: number = 0;

  maxInterestRate: number = 0;

  borderInterestRatePercent: number = 0;

  borderInterestRate: number = 0;

  creditInputTitle: string = '';

  loanCaption: string = '';

  offerCaption: string = '';

  offerMessageCaption: string = '';

  allSpecialInterestRate: number = 0;

  specialInterestRate: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get currentLoanType() {
    return this.loanType;
  }

  get currentInitialFee() {
    return this.initialFee;
  }

  get currentLoanTerms() {
    return this.loanTerms;
  }

  get currentDiscount() {
    return this.discount;
  }

  get currentPrice() {
    return this.price;
  }

  get currentInsuranceDiscounts() {
    return this.insuranceDiscounts;
  }

  getInterestRate() {
    return this.interestRate;
  }

  getRequiredMonthlyIncome() {
    return this.requiredMonthlyIncome;
  }

  getMonthlyPayment() {
    return this.monthlyPayment;
  }

  getLoanOffer() {
    return this.loanOffer;
  }

  set currentLoanTerms(value: number) {
    if (value >= this.minLoanTerms && value <= this.maxLoanTerms) {
      this.loanTerms = value;
    }
    if (value < this.minLoanTerms) {
      this.loanTerms = this.minLoanTerms;
    }
    if (value > this.maxLoanTerms) {
      this.loanTerms = this.maxLoanTerms;
    }
  }

  set currentInitialFee(value: number) {
    if (value >= this.minInitialFee && value <= this.maxInitialFee) {
      this.initialFee = value;
    }
    if (value < this.minInitialFee) {
      this.initialFee = this.minInitialFee;
    }
    if (value > this.maxInitialFee) {
      this.initialFee = this.maxInitialFee;
    }
  }

  set currentLoanType(value: LoanTypes | null) {
    this.loanType = value;
  }

  set currentPrice(value: number) {
    if (value >= this.minPrice && value <= this.maxPrice) {
      this.price = value;
    }
    if (value < this.minPrice) {
      this.price = this.minPrice;
    }
    if (value > this.maxPrice) {
      this.price = this.maxPrice;
    }
  }

  set currentDiscount(value: Values) {
    if (typeof value === 'number') this.discount += value;
  }

  set currentInsuranceDiscounts(value: Values) {
    if (typeof value === 'number') this.insuranceDiscounts += value;
  }

  setRequiredMonthlyIncome() {
    this.requiredMonthlyIncome = (this.monthlyPayment * 100) / REQUIRED_MONTHLY_INCOME_PERCENT;
  }

  setMonthlyPayment() {
    const monthlyInterestRate = Math.round((this.interestRate / 100 / 12) * 100000) / 100000;
    this.monthlyPayment = Math.round(
      this.loanOffer *
        (monthlyInterestRate + monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, this.loanTerms * 12) - 1)),
    );
  }

  setLoanOffer() {
    this.loanOffer = this.currentPrice - this.discount - this.initialFee;
  }

  setInterestRate() {
    if (this.borderInterestRatePercent > 0) {
      this.interestRate =
        (this.currentPrice * this.borderInterestRatePercent) / 100 > this.initialFee
          ? this.maxInterestRate
          : this.minInterestRate;
      return;
    }
    if (this.borderInterestRate > 0) {
      switch (this.currentInsuranceDiscounts) {
        case 0:
          this.interestRate = this.currentPrice < this.borderInterestRate ? this.maxInterestRate : this.minInterestRate;
          break;

        case this.insuranceCheckboxNames.length:
          this.interestRate = this.allSpecialInterestRate;
          break;

        default:
          this.interestRate = this.specialInterestRate;
          break;
      }
    }
  }

  setStepInitialFee() {
    this.stepInitialFee = (this.price * this.stepInitialFeePercent) / 100;
  }

  setMinInitialFee() {
    this.minInitialFee = (this.currentPrice * this.minInitialFeePercent) / 100;
  }

  setMaxInitialFee() {
    this.maxInitialFee = this.currentPrice - this.discount - this.minCreditAmount;
  }

  setInitialLoanСonditions() {
    const conditions = Loans.find((item) => item.name === this.loanType);
    if (conditions) {
      this.price = conditions.defaultPrice ? conditions.defaultPrice : 0;
      this.defaultPrice = conditions.defaultPrice ? conditions.defaultPrice : 0;
      this.minPrice = conditions.minPrice ? conditions.minPrice : 0;
      this.maxPrice = conditions.maxPrice ? conditions.maxPrice : 0;
      this.discountCheckboxes = conditions.discountCheckboxes ? conditions.discountCheckboxes : [];
      this.creditInputTitle = conditions.creditInputTitle ? conditions.creditInputTitle : '';
      this.step = conditions.step ? conditions.step : 0;
      this.minInitialFeePercent = conditions.minInitialFee ? conditions.minInitialFee : 0;
      this.minCreditAmount = conditions.minCreditAmount ? conditions.minCreditAmount : 0;
      this.setMinInitialFee();
      this.setMaxInitialFee();
      this.currentInitialFee = this.minInitialFee;
      this.stepInitialFeePercent = conditions.stepInitialFee ? conditions.stepInitialFee : 0;
      this.minLoanTerms = conditions.minLoanTerms ? conditions.minLoanTerms : 0;
      this.maxLoanTerms = conditions.maxLoanTerms ? conditions.maxLoanTerms : 0;
      this.currentLoanTerms = this.minLoanTerms;
      this.loanCaption = conditions.loanCaption ? conditions.loanCaption : '';
      this.offerCaption = conditions.offerCaption ? conditions.offerCaption : '';
      this.setLoanOffer();
      this.minInterestRate = conditions.minInterestRate ? conditions.minInterestRate : 0;
      this.maxInterestRate = conditions.maxInterestRate ? conditions.maxInterestRate : 0;
      this.borderInterestRatePercent = conditions.borderInterestRatePercent ? conditions.borderInterestRatePercent : 0;
      this.borderInterestRate = conditions.borderInterestRate ? conditions.borderInterestRate : 0;
      this.setInterestRate();
      this.setMonthlyPayment();
      this.insuranceCheckboxNames = conditions.insuranceCheckboxNames ? conditions.insuranceCheckboxNames : [];
      this.allSpecialInterestRate = conditions.allSpecialInterestRate ? conditions.allSpecialInterestRate : 0;
      this.specialInterestRate = conditions.specialInterestRate ? conditions.specialInterestRate : 0;
      this.offerMessageCaption = conditions.offerMessageCaption ? conditions.offerMessageCaption : '';
      this.discount = 0;
      this.insuranceDiscounts = 0;
    }
  }

  updateLoanConditions() {
    this.setLoanOffer();
    this.setInterestRate();
    this.setMonthlyPayment();
    this.setRequiredMonthlyIncome();
  }
}
