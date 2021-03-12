import React from 'react';
import './checkbox.scss';

import ToggleableInput, { Props as InputProps } from '../toggleable-input';
import Icon from '../../../icon/icon';

type Props = Omit<InputProps, 'type' | 'inputClassName' | 'labelClassName'> & {
  children: string
};

const Checkbox = ({ children, ...props }: Props) => {
  return (
    <ToggleableInput
      type="checkbox"
      inputClassName="checkbox"
      labelClassName="checkbox__label"
      {...props}
    >
      <Icon iconId="checkmark" className="checkbox__icon" />
      {children}
    </ToggleableInput>
  );
};

export default Checkbox;
