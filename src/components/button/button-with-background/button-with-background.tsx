import React from 'react';
import './button-with-background.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button, { Props as ButtonProps } from '../button';

type Props = ButtonProps & {
  background: 'blank' | 'colored',
  isDisabled?: boolean,
  isFitParent?: boolean
}

const ButtonWithBackground = ({className, isDisabled = false, background, isFitParent = false, ...props}: Props) => {
  const btnClassName = conditionalClassName({
    staticClassName: 'background-btn',
    conditionalClassNames: {
      [className || '']: className !== undefined,
      'background-btn--blank': background === 'blank',
      'background-btn--disabled': isDisabled,
      'background-btn--fit-parent': isFitParent
    }
  });

  return (
    <Button className={btnClassName} {...props} />
  );
};

export default ButtonWithBackground;
