import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './IconButton.module.scss';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'sm';
}

const cx = classNames.bind(styles);

const IconButton: FC<IconButtonProps> = (props) => {
  const { size, className, children, ...rest } = props;
  const styleNames = cx('icon-btn', { [`icon-btn--${size}`]: size }, className);
  return (
    <button className={styleNames} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
