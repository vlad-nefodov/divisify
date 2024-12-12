import { ComponentPropsWithoutRef, FC } from 'react';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import DropdownMenu from '@/components/ui/DropdownMenu/DropdownMenu';
import styles from './Header.module.scss';

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { name, onEdit, onDelete } = props;

  return (
    <div className={styles.header}>
      <div>{name}</div>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Button variant='ghost' size='lg' isIcon>
            <EllipsisVertical />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Content.Item disabled onClick={onEdit}>
            <Pencil />
            Edit
          </DropdownMenu.Content.Item>
          <DropdownMenu.Content.Item variant='danger' onClick={onDelete}>
            <Trash />
            Delete
          </DropdownMenu.Content.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

export default Header;
