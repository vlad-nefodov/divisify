import { ComponentPropsWithoutRef, FC } from 'react';
import { faClockRotateLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../../ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.scss';

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles['header__title']}>{title}</div>
      <div className={styles['header__buttons']}>
        <Button disabled variant='outline-secondary'>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          History
        </Button>
        <Button disabled variant='primary'>
          <FontAwesomeIcon icon={faPlus} />
          Create new list
        </Button>
      </div>
    </div>
  );
};

export default Header;
