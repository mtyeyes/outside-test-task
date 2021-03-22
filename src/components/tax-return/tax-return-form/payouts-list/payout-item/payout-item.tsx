import React from 'react';
import './payout-item.scss';

import { TaxReturnPayout } from '../../../../../hooks/use-tax-return-reducer';
import Checkbox from '../../../../input/toggleable-input/checkbox/checkbox';
import TwoToneText from '../../../../two-tone-text/two-tone-text';
import relevantEndingsToNumeralValues from '../../../../../utils/relevant-endings-to-numeral-values';

type Props = {
  payoutData: TaxReturnPayout;
  index: number;
  handleChange: (year: number, isChecked: boolean) => void;
};

const PayoutItem = ({ payoutData, index, handleChange }: Props) => {
  const year = index + 1;
  const checkboxLabel = payoutData.isReceived
    ? [
        `в${relevantEndingsToNumeralValues(year, 'preposition')} ${year}-${relevantEndingsToNumeralValues(
          year,
          'years',
        )} год возвращено ${payoutData.amount.toLocaleString('ru-RU')} рубл${relevantEndingsToNumeralValues(
          payoutData.amount,
          'rubles',
        )}. `,
        `${payoutData.isReceived && payoutData.receivedFor === 'time' ? 'Снижен срок' : 'Снижен платеж'}`,
      ]
    : [
        `${payoutData.amount.toLocaleString('ru-RU')} рубл${relevantEndingsToNumeralValues(
          payoutData.amount,
          'rubles',
        )} `,
        `в${relevantEndingsToNumeralValues(year, 'preposition')} ${year}-${relevantEndingsToNumeralValues(
          year,
          'years',
        )} год`,
      ];

  return (
    <li className="tax-return-payout__item">
      <Checkbox
        id={`${index}-payout-checkbox`}
        groupName="payment"
        isChecked={payoutData.isSelected}
        isDisabled={payoutData.isReceived}
        onChange={(isChecked) => handleChange(index, isChecked)}
      >
        <TwoToneText mainText={checkboxLabel[0]} secondaryText={checkboxLabel[1]} />
      </Checkbox>
    </li>
  );
};

export default PayoutItem;
