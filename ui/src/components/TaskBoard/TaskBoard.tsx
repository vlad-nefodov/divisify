import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/state/store/types';

import Body from './Body/Body';
import Header from './Header/Header';
import { fetchTaskLists } from '@/services/state/slices/taskLists/thunks';
import styles from './TaskBoard.module.scss';
import { taskListsSelectors } from '@/services/state/slices/taskLists/taskListsSlice';

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
    <div className={styles['task-board']}>
      <Header title='My Task Board' />
      <Body taskLists={taskLists} />
    </div>
  );
};

export default TaskBoard;
