import React, { Dispatch } from 'react';
import './payout-priority-list.scss';

import { PayoutPriority, TaxReturnAction } from '../../../../hooks/use-tax-return-reducer';
import Fieldset from '../../../fieldset/fieldset';
import PayoutPriorityItem from './payout-priority-item/payout-priority-item';

type Props = {
  payoutPriority: PayoutPriority;
  dispatch: Dispatch<TaxReturnAction>;
};

const PayoutPriorityList = ({ payoutPriority, dispatch }: Props) => {
  const payoutPriorityMapCallback = (id: string) => {
    return (
      <PayoutPriorityItem
        key={id}
        name={payoutPriority[id].name}
        isChecked={payoutPriority[id].isSelected}
        handleChange={() =>
          dispatch({
            type: 'selectPayoutPriority',
            payload: id,
          })
        }
      />
    );
  };

  return (
    <div className="payout-priority-list__fieldset-bug-workaround">
      <Fieldset legend="Что уменьшаем?">
        <ul className="payout-priority-list">{Object.keys(payoutPriority).map(payoutPriorityMapCallback)}</ul>
      </Fieldset>
    </div>
  );
};

export default PayoutPriorityList;
