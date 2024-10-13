import './TaskBoardBodyColumn.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import TaskBoardBodyColumnBody from './TaskBoardBodyColumnBody/TaskBoardBodyColumnBody';
import TaskBoardBodyColumnHeader from './TaskBoardBodyColumnHeader/TaskBoardBodyColumnHeader';
import { TaskList } from '../../../../services/state/slices/types';

export interface TaskBoardBodyColumnProps
  extends ComponentPropsWithoutRef<'div'> {
  taskList: TaskList;
  taskLists: TaskList[];
}

const TaskBoardBodyColumn: FC<TaskBoardBodyColumnProps> = (props) => {
  const { taskList, taskLists } = props;

  return (
    <div className='task-board-body__col'>
      <TaskBoardBodyColumnHeader
        listId={taskList.id}
        title={taskList.name}
        count={taskList.tasksIds.length}
      />
      <TaskBoardBodyColumnBody tasksIds={taskList.tasksIds} lists={taskLists} />
    </div>
  );
};

export default TaskBoardBodyColumn;
