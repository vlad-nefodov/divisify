import { ComponentPropsWithoutRef, FC } from 'react';
import { History, Plus } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import styles from './Header.module.scss';

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles['header__title']}>{title}</div>
      <div className={styles['header__buttons']}>
        <Button disabled variant='secondary'>
          History
          <History />
        </Button>
        <Button disabled variant='primary'>
          Create <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Header;
