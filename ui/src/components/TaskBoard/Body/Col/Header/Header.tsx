import { ComponentPropsWithoutRef, FC } from 'react';
import {
  faEllipsisVertical,
  faPenToSquare,
  faPlus,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import Button from '../../../../ui/Button/Button';
import DropdownMenu from '../../../../ui/DropdownMenu/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '../../../../ui/IconButton/IconButton';
import { deleteTaskListById } from '../../../../../services/state/slices/taskLists/thunks';
import styles from './Header.module.scss';
import { useAppDispatch } from '../../../../../services/state/store/types';

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  count: number;
  listId: string;
}

const Header: FC<HeaderProps> = ({ title, count, listId }) => {
  const dispatch = useAppDispatch();
  const onDeleteHandler = () => dispatch(deleteTaskListById({ id: listId }));

  return (
    <div className={styles.header}>
      <div className={styles['header__info']}>
        <div>{title}</div>
        <div className={styles['header__info__actions']}>
          <div>{count}</div>
          <DropdownMenu>
            <DropdownMenu.Trigger>
              <IconButton>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Content.Item disabled>
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </DropdownMenu.Content.Item>
              <DropdownMenu.Content.Item disabled>
                <FontAwesomeIcon icon={faPlus} />
                Add new card
              </DropdownMenu.Content.Item>
              <DropdownMenu.Content.Item
                variant='danger'
                onClick={onDeleteHandler}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                Delete
              </DropdownMenu.Content.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </div>
      <Button disabled variant='dashed-secondary' size='lg'>
        <FontAwesomeIcon icon={faPlus} />
        Add new card
      </Button>
    </div>
  );
};

export default Header;
