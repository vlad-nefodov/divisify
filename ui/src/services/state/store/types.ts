import { useDispatch, useSelector } from 'react-redux';
import { ITaskListRepository } from '../../api/repositories/TaskListRepository';
import { ITaskRepository } from '../../api/repositories/TaskRepository';
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export interface IDependencies {
  taskListRepository: ITaskListRepository;
  taskRepository: ITaskRepository;
}
export interface IThunkDependencies {
  extra: IDependencies;
  state: RootState;
}
