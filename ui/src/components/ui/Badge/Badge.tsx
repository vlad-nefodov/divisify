import './Badge.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../utils/classNames';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  decorated?: boolean;
}

const Badge: FC<BadgeProps> = ({ decorated, className, children, ...rest }) => {
  const styleNames = classNames(
    'badge',
    {
      'badge--decorated': decorated
    },
    className
  );

  return (
    <span className={styleNames} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
