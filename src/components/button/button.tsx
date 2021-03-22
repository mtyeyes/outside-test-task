import React, { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import './button.scss';

export type Props = ButtonAsButtonProps | ButtonAsLinkProps;

type ButtonAsButtonProps = ButtonAsButton & ComponentProps<'button'>;

type ButtonAsButton = { component?: 'button' };

type ButtonAsLinkProps = ButtonAsLink & ComponentProps<'a'>;

type ButtonAsLink = {
  component: 'link';
  to: string;
};

const Button = ({ component, ...props }: Props) => {
  switch (component) {
    case 'link':
      return <Link {...(props as ComponentProps<Link>)} />;
    default: {
      const { type, ...buttonProps } = {
        ...(props as ComponentProps<'button'>),
      };
      return <button type={type === undefined ? 'button' : type} {...buttonProps} />;
    }
  }
};

export default Button;
