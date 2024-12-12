import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { Slot } from '../Slot';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?:
    | 'primary'
    | 'primary-outline'
    | 'primary-dashed'
    | 'secondary'
    | 'secondary-outline'
    | 'secondary-dashed'
    | 'danger'
    | 'danger-outline'
    | 'danger-dashed'
    | 'ghost'
    | 'link';
  size?: 'sm' | 'md' | 'lg';
  isIcon?: boolean;
  asChild?: boolean;
}

const cx = classNames.bind(styles);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isIcon = false,
      asChild = false,
      className,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    const Comp = asChild ? Slot : 'button';
    const styleNames = cx(
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      {
        'btn--icon': isIcon,
        'btn--disabled': rest.disabled,
        [`btn--${variant}--disabled`]: rest.disabled
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

Button.displayName = 'Button';
export { Button, type ButtonProps };
