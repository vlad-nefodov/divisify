import './TaskBoardBodyColumnBody.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import TaskCard from '../../../../TaskCard/TaskCard';
import { TaskList } from '../../../../../services/state/slices/types';

export interface TaskBoardBodyColumnBodyProps
  extends ComponentPropsWithoutRef<'div'> {
  tasksIds: string[];
  lists: TaskList[];
}

const TaskBoardBodyColumnBody: FC<TaskBoardBodyColumnBodyProps> = ({
  tasksIds,
  lists
}) => {
  return (
    <div className='task-board-body-col__body'>
      {tasksIds.map((taskId) => (
        <TaskCard
          key={taskId}
          taskId={taskId}
          lists={lists.filter((l) => !l.tasksIds.includes(taskId))}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
};

export default TaskBoardBodyColumnBody;
