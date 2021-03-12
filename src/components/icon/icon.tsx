import React from 'react';
import './icon.scss';

import conditionalClassName from '../../utils/conditional-classname';

type Props = {
  iconId: IconIds
  className?: string;
}

export type IconIds = 'close' | 'checkmark';

const Icon = ({iconId, className}: Props) => {
  const iconClassName = conditionalClassName({
    staticClassName: `icon-${iconId} icon`,
    conditionalClassNames: {
      [className || '']: className !== undefined
    }
  });

  return <span className={iconClassName} />;
};

export default Icon;
