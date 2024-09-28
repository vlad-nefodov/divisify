import './TaskBoardBody.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import TaskBoardBodyColumn from './TaskBoardBodyColumn/TaskBoardBodyColumn';
import { ITaskList } from '../../../services/state/slices/types';

export interface TaskBoardBodyProps extends ComponentPropsWithoutRef<'div'> {
  taskLists: ITaskList[];
}

const TaskBoardBody: FC<TaskBoardBodyProps> = (props) => {
  return (
    <div className='task-board__body'>
      {props.taskLists.map((l, _, lists) => (
        <TaskBoardBodyColumn taskList={l} taskLists={lists} key={l.id} />
      ))}
    </div>
  );
};

export default TaskBoardBody;