import { useDispatch, useSelector } from 'react-redux';

import { TaskListRepository } from '../../api/repositories/TaskListRepository';
import { TaskRepository } from '../../api/repositories/TaskRepository';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export interface Dependencies {
  taskListRepository: TaskListRepository;
  taskRepository: TaskRepository;
}
export interface ThunkDependencies {
  extra: Dependencies;
  state: RootState;
}
