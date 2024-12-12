import { ComponentPropsWithoutRef, FC } from 'react';
import { EllipsisVertical, Pencil, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import DropdownMenu from '@/components/ui/DropdownMenu/DropdownMenu';
import { deleteTaskListById } from '@/services/state/slices/taskLists/thunks';
import styles from './Header.module.scss';
import { useAppDispatch } from '@/services/state/store/types';

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
              <Button variant='ghost' size='md' isIcon>
                <EllipsisVertical />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Content.Item disabled>
                <Pencil />
                Edit
              </DropdownMenu.Content.Item>
              <DropdownMenu.Content.Item disabled>
                <Plus />
                Add new card
              </DropdownMenu.Content.Item>
              <DropdownMenu.Content.Item
                variant='danger'
                onClick={onDeleteHandler}
              >
                <Trash />
                Delete
              </DropdownMenu.Content.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </div>
      <Button disabled variant='secondary-dashed' size='lg'>
        <Plus />
        Add new card
      </Button>
    </div>
  );
};

export default Header;
