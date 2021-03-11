import React, { FC, ComponentProps } from 'react';
import './text-button.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button from '../button';

type Props = {
  children: string
}

const TextButton: FC<ComponentProps<'button'> & Props> = ({className, ...props}) => {
  const btnClassName = conditionalClassName({
    staticClassName: 'text-btn',
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  });

  return (
    <Button className={btnClassName} {...props} />
  );
};

export default TextButton;
