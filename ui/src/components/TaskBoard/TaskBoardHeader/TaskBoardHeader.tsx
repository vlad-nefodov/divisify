import './TaskBoardHeader.css';

import { ComponentPropsWithoutRef, FC } from 'react';
import { faClockRotateLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '../../ui/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TaskBoardHeaderProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
}

const TaskBoardHeader: FC<TaskBoardHeaderProps> = ({ title }) => {
  return (
    <div className='task-board__header'>
      <div className='task-board-header__title'>{title}</div>
      <div className='task-board-header__section'>
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

export default TaskBoardHeader;
