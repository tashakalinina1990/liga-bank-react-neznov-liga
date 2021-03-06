import React, { useEffect, useState, lazy, Suspense } from 'react';
import { observer } from 'mobx-react-lite';
import cl from 'clsx';
import s from './Calculator.module.scss';
import Select from '../Select/Select';
import { Loans, SELECT_PLACEHOLDER } from '../../const';
import { ILoan, LoanTypes, Values } from '../../types';
import LoanCalculatorStore from '../../store/loanCalculatorStore';
import InputTypeNumber from '../InputTypeNumber/InputTypeNumber';
import InputTypeRange from '../InputTypeRange/InputTypeRange';
import Checkbox from '../Checkbox/Checkbox';
import { splitPrice } from '../../utils/utils';

const CheckoutForm = lazy(() => import('../CheckoutForm/CheckoutForm'));
const QueryForm = lazy(() => import('../QueryForm/QueryForm'));

interface ICalculator {
  onSuccess: () => void;
}

const store = new LoanCalculatorStore();

const Calculator = observer(({ onSuccess }: ICalculator) => {
  const [selectValue, setSelectValue] = useState<string>(SELECT_PLACEHOLDER);
  const [isShowQueryForm, setIsShowQueryForm] = useState<boolean>(false);
  const [isShowMinLoanMessage, setIsShowMinLoanMessage] = useState<boolean>(false);
  const setSelectOptions = (items: ILoan[]) => {
    const options: string[] = [];
    items.map((elem) => options.push(elem.name));
    return options;
  };

  const handleSelectClick = (value: string) => {
    store.currentLoanType = value as LoanTypes;
    setSelectValue(value);
  };

  const handleDiscountCheckboxChange = (value: Values): void => {
    store.currentDiscount = value;
  };

  const handleInsuranceCheckboxChange = (value: Values): void => {
    store.currentInsuranceDiscounts = value;
  };

  const handleInputNumberChange = (value: number): void => {
    store.currentPrice = value;
  };

  const handleInputRangeChange = (value: number): void => {
    store.currentInitialFee = value;
  };

  const handleInputLoanRangeChange = (value: number): void => {
    store.currentLoanTerms = value;
  };

  const handleInputNumberIncrease = (): void => {
    if (store.currentPrice) store.currentPrice += store.step;
  };

  const handleInputNumberReduce = (): void => {
    if (store.currentPrice) store.currentPrice -= store.step;
  };

  const handleCheckoutFormSubmit = (): void => {
    setIsShowQueryForm(true);
  };

  const handleQueryFormSubmit = (): void => {
    store.currentLoanType = null;
    setSelectValue(SELECT_PLACEHOLDER);
    setIsShowQueryForm(false);
    onSuccess();
  };

  useEffect(() => {
    store.setInitialLoan??onditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentLoanType]);

  useEffect(() => {
    store.setStepInitialFee();
    store.setMinInitialFee();
    store.setMaxInitialFee();
    if (store.currentInitialFee > store.maxInitialFee) store.currentInitialFee = store.maxInitialFee;
    if (store.currentInitialFee < store.minInitialFee) store.currentInitialFee = store.minInitialFee;
    setIsShowQueryForm(false);
    store.updateLoanConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentPrice, store.currentDiscount]);

  useEffect(() => {
    store.currentLoanTerms = store.minLoanTerms;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentPrice]);

  useEffect(() => {
    setIsShowQueryForm(false);
    store.updateLoanConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentLoanTerms, store.currentInitialFee, store.currentInsuranceDiscounts]);

  return (
    <section className={cl(s.wrap)}>
      <div className={cl(s.content)} id="calculator">
        <h2 className={cl(s.header)}>?????????????????? ??????????????????????</h2>
        <form className={cl(s.form)}>
          <h3 className={cl(s.stepCaption)}>?????? 1. ???????? ??????????????</h3>
          <Select
            className={cl(s.select)}
            selectNameId="selectLoan"
            options={setSelectOptions(Loans)}
            onClick={handleSelectClick}
            value={selectValue}
          />
          {store.currentLoanType && (
            <>
              <h3 className={cl(s.stepCaption, s.stepCaption__marginTop)}>?????? 2. ?????????????? ?????????????????? ??????????????</h3>
              <InputTypeNumber
                units="????????????"
                value={store.currentPrice}
                textAbove={store.creditInputTitle}
                minValue={store.minPrice}
                maxValue={store.maxPrice}
                textBelow={`???? ${splitPrice(store.minPrice)} ???? ${splitPrice(store.maxPrice)} ????????????`}
                onChange={handleInputNumberChange}
                onIncrease={handleInputNumberIncrease}
                onReduce={handleInputNumberReduce}
              />
              <InputTypeRange
                units="????????????"
                textAbove="???????????????????????????? ??????????"
                value={store.currentInitialFee}
                minValue={store.minInitialFee}
                maxValue={store.maxInitialFee}
                step={store.stepInitialFee}
                onChange={handleInputRangeChange}
                minRangeText={`${store.minInitialFeePercent}% = ${splitPrice(store.minInitialFee)}`}
                maxRangeText={splitPrice(store.maxInitialFee.toString())}
                showExceedMaxValue={(value: boolean) => setIsShowMinLoanMessage(value)}
              />
              <InputTypeRange
                units="??????"
                textAbove="???????? ????????????????????????"
                value={store.currentLoanTerms}
                minValue={store.minLoanTerms}
                maxValue={store.maxLoanTerms}
                step={1}
                onChange={handleInputLoanRangeChange}
                minRangeText={`${store.minLoanTerms} ??????`}
                maxRangeText={`${store.maxLoanTerms} ??????`}
              />
              {store.discountCheckboxes.length > 0 &&
                store.discountCheckboxes.map((item) => (
                  <Checkbox
                    className={cl(s.checkbox)}
                    labelText={item.name}
                    valueChecked={item.discount}
                    valueNotChecked={-item.discount}
                    onChange={handleDiscountCheckboxChange}
                    key={item.name}
                  />
                ))}
              {store.insuranceCheckboxNames.length > 0 &&
                store.insuranceCheckboxNames.map((item) => (
                  <Checkbox
                    className={cl(s.checkbox)}
                    labelText={item}
                    valueChecked={1}
                    valueNotChecked={-1}
                    onChange={handleInsuranceCheckboxChange}
                    key={item}
                  />
                ))}
            </>
          )}
        </form>
        {store.currentLoanType && !isShowMinLoanMessage && (
          <Suspense fallback={<div>Loading....</div>}>
            <CheckoutForm
              className={cl(s.checkoutForm)}
              onSubmit={handleCheckoutFormSubmit}
              context={[
                {
                  name: store.offerCaption,
                  value: `${splitPrice(store.getLoanOffer())} ????????????`,
                },
                {
                  name: '???????????????????? ????????????',
                  value: `${store.getInterestRate()}%`,
                },
                {
                  name: '?????????????????????? ????????????',
                  value: splitPrice(store.getMonthlyPayment()),
                },
                {
                  name: '?????????????????????? ??????????',
                  value: splitPrice(store.getRequiredMonthlyIncome()),
                },
              ]}
            />
          </Suspense>
        )}
        {store.currentLoanType && isShowMinLoanMessage && (
          <div className={cl(s.minLoanMessage)}>
            <p className={cl(s.minLoanMessageCaption)}>
              ?????? ???????? ???? ???????????? {store.offerMessageCaption || '??????????????'} ???????????? {splitPrice(store.minCreditAmount)}{' '}
              ????????????.
            </p>
            <p className={cl(s.minLoanMessageText)}>???????????????????? ???????????????????????? ???????????? ?????????????????? ?????? ??????????????.</p>
          </div>
        )}
        {isShowQueryForm && (
          <Suspense fallback={<div>Loading....</div>}>
            <QueryForm
              className={cl(s.queryForm)}
              context={[
                { name: '?????????? ????????????', value: '??? 0010' },
                { name: '???????? ??????????????', value: store.loanCaption },
                {
                  name: store.creditInputTitle,
                  value: `${splitPrice(store.currentPrice)} ????????????`,
                },
                {
                  name: '???????????????????????????? ??????????',
                  value: `${splitPrice(store.currentInitialFee)} ????????????`,
                },
                {
                  name: '???????? ????????????????????????',
                  value: `${store.currentLoanTerms} ??????`,
                },
              ]}
              onSubmit={handleQueryFormSubmit}
            />
          </Suspense>
        )}
      </div>
    </section>
  );
});

export default Calculator;
