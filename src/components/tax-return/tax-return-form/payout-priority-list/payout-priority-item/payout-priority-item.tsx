import React from 'react';

import Tag from '../../../../input/toggleable-input/tag/tag';

type Props = {
  name: string;
  isChecked: boolean;
  handleChange: () => void;
};

const PayoutPriorityItem = ({ name, isChecked, handleChange }: Props) => {
  return (
    <li className="tax-return-form__tags-item">
      <Tag groupName="payoutPriority" id={`${name}-priority-tag`} isChecked={isChecked} onChange={handleChange}>
        {name}
      </Tag>
    </li>
  );
};

export default PayoutPriorityItem;
