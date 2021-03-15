import React, { useState, FormEvent } from 'react';
import './tax-return-form.scss';

import TextButton from '../../button/text-button/text-button';
import TextInput from '../../input/text-input/text-input';
import Tag from '../../input/toggleable-input/tag/tag';
import Fieldset from '../../fieldset/fieldset';
import ButtonWithBackground from '../../button/button-with-background/button-with-background';
import Checkbox from '../../input/toggleable-input/checkbox/checkbox';
import TwoToneText from '../../two-tone-text/two-tone-text';
import conditionalClassName from '../../../utils/conditional-classname';

type Props = {
  onFormSubmit?: () => void,
  className?: string,
}

const payoutPriorityOptions = {amount: 'Платеж',time: 'Срок'}
type PayoutPriorityOptions = keyof typeof payoutPriorityOptions;

const TaxReturnForm = ({ onFormSubmit, className }: Props) => {
  const [incomePerMonth, setIncomePerMonth] = useState('');
  const [payoutPriority, setPayoutPriority] = useState('amount' as PayoutPriorityOptions)

  const formClass = conditionalClassName({
    staticClassName: 'tax-return-form',
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  })

  const buttonClass = conditionalClassName({
    staticClassName: 'tax-return-form__submit-btn',
    conditionalClassNames: {
      [`${className}__submit-btn`]: className !== undefined
    }
  })

  const payoutPriorityMapCallback = (id: PayoutPriorityOptions) => {
    return(
      <li className="tax-return-form__tags-item">
        <Tag
          groupName="payoutPriority"
          id={id}
          key={id}
          isChecked={payoutPriority === id}
          applyChange={() => setPayoutPriority(id)}
        >
          {payoutPriorityOptions[id]}
        </Tag>
      </li>
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if(onFormSubmit !== undefined) {
      e.preventDefault();
      onFormSubmit();
    }
  }

  return (
    <>
      <form className={formClass} id="tax-return-form" onSubmit={handleSubmit}>
        <TextInput
          value={incomePerMonth}
          valueType="number"
          inputId="incomePerMonth"
          placeholderText="Введите данные"
          applyChange={(value) => {setIncomePerMonth(value)}}
        >
          Ваша зарплата в месяц
        </TextInput>
        <TextButton>Рассчитать</TextButton>
        <Fieldset legend="Итого можете внести в качестве досрочных:">
          <ul className="tax-return-form__payment-list">
            <li className="tax-return-form__payment-item">
              <Checkbox
                id="1"
                groupName="payment"
                isChecked={true}
                applyChange={() => {}}
              >
                <TwoToneText
                  mainText="78 000 рублей "
                  secondaryText="в 1-ый год"
                />
              </Checkbox>
            </li>
            <li className="tax-return-form__payment-item">
              <Checkbox
                id="2"
                groupName="payment"
                isChecked={false}
                applyChange={() => {}}
              >
                <TwoToneText
                  mainText="78 000 рублей "
                  secondaryText="во 2-ой год"
                />
              </Checkbox>
            </li>
          </ul>
        </Fieldset>
        <div className="tax-return-form__fieldset-bug-workaround">
          <Fieldset legend="Что уменьшаем?">
            <ul className="tax-return-form__tags-list">
              {Object.keys(payoutPriorityOptions).map(payoutPriorityMapCallback as any)}
            </ul>
          </Fieldset>
        </div>
      </form>
      <ButtonWithBackground className={buttonClass} form="tax-return-form" background="colored" type="submit" isFitParent={true}>Добавить</ButtonWithBackground>
    </>
  );
};

export default TaxReturnForm;
