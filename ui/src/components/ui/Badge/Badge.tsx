import { ComponentPropsWithoutRef, forwardRef } from 'react';

import classNames from 'classnames/bind';
import styles from './Badge.module.scss';
import { Slot } from '../Slot';

interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: 'primary' | 'secondary' | 'danger';
  decorated?: boolean;
  asChild?: boolean;
}

const cx = classNames.bind(styles);

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'primary',
      decorated,
      asChild = false,
      className,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : 'span';
    const styleNames = cx(
      'badge',
      `badge--${variant}`,
      {
        'badge--decorated': decorated,
        [`badge--${variant}--decorated`]: decorated
      },
      className
    );

    return (
      <Comp className={styleNames} ref={forwardedRef} {...rest}>
        {children}
      </Comp>
    );
  }
);

Badge.displayName = 'Badge';
export { Badge, type BadgeProps };
