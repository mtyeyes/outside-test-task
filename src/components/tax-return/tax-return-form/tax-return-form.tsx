import React, { FormEvent } from 'react';
import './tax-return-form.scss';

import TextButton from '../../button/text-button/text-button';
import TextInput from '../../input/text-input/text-input';
import ButtonWithBackground from '../../button/button-with-background/button-with-background';
import conditionalClassName from '../../../utils/conditional-classname';
import useTaxReturnReducer, { TaxReturnState } from '../../../hooks/use-tax-return-reducer';
import PayoutsList from './payouts-list/payouts-list';
import PayoutPriorityList from './payout-priority-list/payout-priority-list';

type Props = {
  onFormSubmit?: (formData: TaxReturnState) => void;
  className?: string;
};

const TaxReturnForm = ({ onFormSubmit, className }: Props) => {
  const [taxReturnState, dispatch, refreshTaxReturnPayouts] = useTaxReturnReducer();

  const formClass = conditionalClassName({
    staticClassName: 'tax-return-form',
    conditionalClassNames: {
      [className || '']: className !== undefined,
    },
  });

  const buttonClass = conditionalClassName({
    staticClassName: 'tax-return-form__submit-btn',
    conditionalClassNames: {
      [`${className}__submit-btn`]: className !== undefined,
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'receiveSelectedTaxReturnPayout',
    });
    if (onFormSubmit !== undefined) {
      onFormSubmit(taxReturnState);
    }
  };

  return (
    <>
      <form className={formClass} id="tax-return-form" onSubmit={handleSubmit}>
        <TextInput
          value={
            taxReturnState.incomePerMonth !== undefined && !isNaN(taxReturnState.incomePerMonth)
              ? `${taxReturnState.incomePerMonth}`
              : ''
          }
          valueType="number"
          inputId="incomePerMonth"
          placeholderText="Введите данные"
          onChange={(value) => {
            dispatch({
              type: 'setIncomePerMonth',
              payload: parseInt(value),
            });
          }}
        >
          Ваша зарплата в месяц
        </TextInput>
        <TextButton onClick={refreshTaxReturnPayouts}>Рассчитать</TextButton>
        {taxReturnState.taxReturnPayouts.length !== 0 && (
          <PayoutsList payoutsData={taxReturnState.taxReturnPayouts} dispatch={dispatch} />
        )}
        <PayoutPriorityList payoutPriority={taxReturnState.payoutPriority} dispatch={dispatch} />
      </form>
      <ButtonWithBackground
        className={buttonClass}
        form="tax-return-form"
        background="colored"
        type="submit"
        isFitParent={true}
      >
        Добавить
      </ButtonWithBackground>
    </>
  );
};

export default TaxReturnForm;
