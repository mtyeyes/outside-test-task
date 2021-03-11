import React, { FC, ComponentProps } from 'react';
import './button.scss';


const Button: FC<ComponentProps<'button'>> = ({...props}) => {

  return <button type="button" {...props} />;
};

export default Button;