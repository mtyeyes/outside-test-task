import React, { FC, ComponentProps } from 'react';
import './button-with-background.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button from '../button';

type Props = {
  background: 'blank' | 'colored',
  isDisabled?: boolean,
  isFitParent?: boolean
}

const ButtonWithBackground: FC<ComponentProps<'button'> & Props> = ({className, isDisabled = false, background, isFitParent = false, ...props}) => {
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
