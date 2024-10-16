import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './Badge.module.scss';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  decorated?: boolean;
}

const cx = classNames.bind(styles);

const Badge: FC<BadgeProps> = ({ decorated, className, children, ...rest }) => {
  const styleNames = cx('badge', { 'badge--decorated': decorated }, className);
  return (
    <span className={styleNames} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
