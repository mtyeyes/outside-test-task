import React from 'react';
import './icon-button.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button, { Props as ButtonProps } from '../button';
import Icon, { IconIds } from '../../icon/icon';

type Props = ButtonProps & {
  iconId: IconIds
}

const IconButton = ({className, iconId, children, ...props}: Props) => {
  const btnClassName = conditionalClassName({
    staticClassName: 'icon-btn',
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  });

  return (
    <Button type="button" className={btnClassName} {...props}>
      {children}
      <Icon iconId={iconId} />
    </Button>
  );
};

export default IconButton;
