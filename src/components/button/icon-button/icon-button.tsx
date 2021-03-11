import React, { FC, ComponentProps } from 'react';
import './icon-button.scss';

import conditionalClassName from '../../../utils/conditional-classname';
import Button from '../button';
import Icon, { IconIds } from '../../icon/icon';

type Props = {
  iconId: IconIds
}

const IconButton: FC<ComponentProps<'button'> & Props> = ({className, iconId, children, ...props}) => {
  const btnClassName = conditionalClassName({
    staticClassName: 'icon-btn',
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  });

  return (
    <Button className={btnClassName} {...props}>
      {children}
      <Icon iconId={iconId} />
    </Button>
  );
};

export default IconButton;
