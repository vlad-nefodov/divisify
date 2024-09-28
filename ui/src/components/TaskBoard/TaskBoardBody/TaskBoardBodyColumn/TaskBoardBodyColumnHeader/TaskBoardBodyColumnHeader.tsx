import './TaskBoardBodyColumnHeader.css';

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
import { useAppDispatch } from '../../../../../services/state/store/types';
import { deleteTaskListById } from '../../../../../services/state/slices/taskLists/thunks';

export interface TaskBoardBodyColumnHeaderProps
  extends ComponentPropsWithoutRef<'div'> {
  title: string;
  count: number;
  listId: string;
}

const TaskBoardBodyColumnHeader: FC<TaskBoardBodyColumnHeaderProps> = ({
  title,
  count,
  listId
}) => {
  const dispatch = useAppDispatch();
  const onDeleteHandler = () => dispatch(deleteTaskListById({ id: listId }));

  return (
    <div className='task-board-body-col__header'>
      <div className='task-board-body-col-header__panel'>
        <div className='task-board-body-col-header-title__panel'>{title}</div>
        <div className='task-board-body-col-header-panel__section'>
          <div className='task-board-body-col-header-panel-section__tasks-count'>
            {count}
          </div>
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

export default TaskBoardBodyColumnHeader;
