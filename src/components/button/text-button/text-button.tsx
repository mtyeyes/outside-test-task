import React from 'react';
import './text-button.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button, {Props as ButtonProps} from '../button';

type Props = ButtonProps & {
  children: string
}

const TextButton = ({className, ...props}: Props) => {
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
