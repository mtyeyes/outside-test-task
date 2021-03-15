import React from 'react';
import './two-tone-text.scss';

import conditionalClassName from '../../utils/conditional-classname';

type Props = {
  mainText: string,
  secondaryText: string,
  isHighlighted?: boolean
}

const TwoToneText = ({ mainText, secondaryText, isHighlighted }: Props) => {
  const secondaryTextClass = conditionalClassName({
    staticClassName: 'two-tone-text two-tone-text--secondary-color',
    conditionalClassNames: {
      'two-tone-text--highlighted': isHighlighted === true
    }
  })
  return (
    <span className="two-tone-text two-tone-text--main-color">
      {mainText}
      <span className="two-tone-text two-tone-text--secondary-color">
        {secondaryText}
      </span>
    </span>
  );
};

export default TwoToneText;
