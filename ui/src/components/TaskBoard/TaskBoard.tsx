import './TaskBoard.css';

import { FC, useEffect } from 'react';
import TaskBoardBody from './TaskBoardBody/TaskBoardBody';
import TaskBoardHeader from './TaskBoardHeader/TaskBoardHeader';
import {
  useAppDispatch,
  useAppSelector
} from '../../services/state/store/types';
import { fetchTaskLists } from '../../services/state/slices/taskLists/thunks';
import { taskListsSelectors } from '../../services/state/slices/taskLists/taskListsSlice';

const TaskBoard: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTaskLists());
  }, [dispatch]);

  const taskLists = useAppSelector(taskListsSelectors.selectAll);
  const taskListsStatus = useAppSelector(taskListsSelectors.selectStatus);

  return taskListsStatus === 'loading' ? (
    'Loading...'
  ) : (
    <div className='task-board'>
      <TaskBoardHeader title='My Task Board' />
      <TaskBoardBody taskLists={taskLists} />
    </div>
  );
};

export default TaskBoard;
