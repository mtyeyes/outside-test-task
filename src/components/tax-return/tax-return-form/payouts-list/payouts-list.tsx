import React, { Dispatch } from 'react';

import Fieldset from '../../../fieldset/fieldset';
import { TaxReturnPayouts, TaxReturnPayout, TaxReturnAction } from '../../../../hooks/use-tax-return-reducer';
import PayoutItem from './payout-item/payout-item';

type Props = {
  payoutsData: TaxReturnPayouts;
  dispatch: Dispatch<TaxReturnAction>;
};

const PayoutsList = ({ payoutsData, dispatch }: Props) => {
  const payoutsDataMapCallback = (payoutData: TaxReturnPayout, i: number) => {
    return (
      <PayoutItem
        key={i}
        index={i}
        handleChange={(year, isChecked) => {
          dispatch({
            type: 'selectTaxReturnPayout',
            payload: {
              index: year,
              isSelected: isChecked,
            },
          });
        }}
        payoutData={payoutData}
      />
    );
  };

  return (
    <Fieldset>
      {payoutsData.slice(0, 10).map(payoutsDataMapCallback)}
      {payoutsData.length > 10 && <p>Отображены возвраты за первые 10 лет</p>}
    </Fieldset>
  );
};

export default PayoutsList;
