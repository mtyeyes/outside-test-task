import React, { FormEvent } from 'react';
import './tax-return-form.scss';

import TextButton from '../../button/text-button/text-button';
import TextInput from '../../input/text-input/text-input';
import Tag from '../../input/toggleable-input/tag/tag';
import Fieldset from '../../fieldset/fieldset';
import ButtonWithBackground from '../../button/button-with-background/button-with-background';
import Checkbox from '../../input/toggleable-input/checkbox/checkbox';
import TwoToneText from '../../two-tone-text/two-tone-text';
import conditionalClassName from '../../../utils/conditional-classname';
import useTaxReturnReducer, { TaxReturnPayout, TaxReturnState } from '../../../hooks/use-tax-return-reducer';
import relevantEndingsToNumeralValues from '../../../utils/relevant-endings-to-numeral-values';

type Props = {
  onFormSubmit?: (formData: TaxReturnState) => void,
  className?: string,
}

const TaxReturnForm = ({ onFormSubmit, className }: Props) => {
  const [taxReturnState, dispatch, refreshTaxReturnPayouts] = useTaxReturnReducer();

  const formClass = conditionalClassName({
    staticClassName: 'tax-return-form',
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  });

  const buttonClass = conditionalClassName({
    staticClassName: 'tax-return-form__submit-btn',
    conditionalClassNames: {
      [`${className}__submit-btn`]: className !== undefined
    }
  });

  const payoutPriorityMapCallback = (id: string) => {
    return(
      <li className="tax-return-form__tags-item" key={id}>
        <Tag
          groupName="payoutPriority"
          id={id}
          isChecked={taxReturnState.payoutPriority[id].isSelected}
          onChange={() => dispatch({ type: 'selectPayoutPriority', payload: id })}
        >
          {taxReturnState.payoutPriority[id].name}
        </Tag>
      </li>
    );
  };

  const taxReturnPayoutsMapCallback = (payout: TaxReturnPayout, i: number) => {
    if(payout === null) { return null }

    const { amount, isSelected, isReceived } = payout;
    const checkboxLabel = isReceived ?
      [
        `в${relevantEndingsToNumeralValues(i + 1, 'preposition')} ${i + 1}-${relevantEndingsToNumeralValues(i + 1, 'years')} год возвращенно ${amount.toLocaleString('ru-RU')} рубл${relevantEndingsToNumeralValues(amount, 'rubles')}. `,
        `${(payout.isReceived && payout.receivedFor === 'time') ? 'Снижен срок' : 'Снижен платеж'}`
      ] :
      [
        `${amount.toLocaleString('ru-RU')} рубл${relevantEndingsToNumeralValues(amount, 'rubles')} `,
        `в${relevantEndingsToNumeralValues(i + 1, 'preposition')} ${i + 1}-${relevantEndingsToNumeralValues(i + 1, 'years')} год`
      ];

    return(
      <li className="tax-return-form__payment-item" key={i}>
        <Checkbox
          id={`${i}`}
          groupName="payment"
          isChecked={isSelected}
          isDisabled={isReceived}
          onChange={(isChecked) => dispatch({type: 'selectTaxReturnPayout', payload: { index: i, isSelected: isChecked}})}
        >
          <TwoToneText
            mainText={checkboxLabel[0]}
            secondaryText={checkboxLabel[1]}
          />
        </Checkbox>
      </li>
    );
  };

  const renderTaxReturnPayouts = () => {
    const payoutNumbers = taxReturnState.taxReturnPayouts.length;
    switch(true) {
      case (payoutNumbers > 10): {
        return (
          <Fieldset legend="Итого можете внести в качестве досрочных:">
            <ul className="tax-return-form__payment-list">
              {taxReturnState.taxReturnPayouts.slice(0, 10).map(taxReturnPayoutsMapCallback)}
              <p>Отображены возвраты за первые 10 лет</p>
            </ul>
          </Fieldset>
        );
      }
      case(payoutNumbers >= 1): {
        return (
          <Fieldset legend="Итого можете внести в качестве досрочных:">
            <ul className="tax-return-form__payment-list">
              {taxReturnState.taxReturnPayouts.map(taxReturnPayoutsMapCallback)}
            </ul>
          </Fieldset>
        );
      }
      default: return null;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: 'receiveSelectedTaxReturnPayout'});
    if(onFormSubmit !== undefined) {onFormSubmit(taxReturnState)}
  };

  return (
    <>
      <form className={formClass} id="tax-return-form" onSubmit={handleSubmit}>
        <TextInput
          value={taxReturnState.incomePerMonth !== undefined && !isNaN(taxReturnState.incomePerMonth) ? `${taxReturnState.incomePerMonth}` : ''}
          valueType="number"
          inputId="incomePerMonth"
          placeholderText="Введите данные"
          onChange={(value) => {dispatch({type: 'setIncomePerMonth', payload: parseInt(value)})}}
        >
          Ваша зарплата в месяц
        </TextInput>
        <TextButton onClick={refreshTaxReturnPayouts}>Рассчитать</TextButton>
        {renderTaxReturnPayouts()}
        <div className="tax-return-form__fieldset-bug-workaround">
          <Fieldset legend="Что уменьшаем?">
            <ul className="tax-return-form__tags-list">
              {Object.keys(taxReturnState.payoutPriority).map(payoutPriorityMapCallback)}
            </ul>
          </Fieldset>
        </div>
      </form>
      <ButtonWithBackground className={buttonClass} form="tax-return-form" background="colored" type="submit" isFitParent={true}>Добавить</ButtonWithBackground>
    </>
  );
};

export default TaxReturnForm;
