import './TaskCardHeader.css';

import { ComponentPropsWithoutRef, FC } from 'react';
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import DropdownMenu from '../../ui/DropdownMenu/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '../../ui/IconButton/IconButton';
import classNames from '../../../utils/classNames';

export interface TaskCardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCardHeader: FC<TaskCardHeaderProps> = (props) => {
  const { name, onEdit, onDelete, className } = props;

  const styleNames = classNames('task-card__header', className);

  return (
    <div className={styleNames}>
      <div className='task-card-header__title'>{name}</div>
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

export default TaskCardHeader;
