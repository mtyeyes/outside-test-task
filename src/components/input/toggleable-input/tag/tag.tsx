import React from 'react';
import './tag.scss';

import ToggleableInput, { Props as InputProps } from '../toggleable-input';

type Props = Omit<InputProps, 'type' | 'inputClassName' | 'labelClassName' | 'isDisabled'>;

const Tag = (props: Props) => {
  return <ToggleableInput type="radio" inputClassName="tag" labelClassName="tag__label" {...props} />;
};

export default Tag;
