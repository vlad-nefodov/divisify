import { ComponentPropsWithoutRef, FC } from 'react';
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import DropdownMenu from '../../ui/DropdownMenu/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '../../ui/IconButton/IconButton';
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
          <IconButton>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Content.Item disabled onClick={onEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
          </DropdownMenu.Content.Item>
          <DropdownMenu.Content.Item variant='danger' onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete
          </DropdownMenu.Content.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

export default Header;
