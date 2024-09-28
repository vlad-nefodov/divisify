import { ITaskList, ITask, IEntityState } from '../types';

export interface ITaskListsState extends IEntityState {}

export interface IFetchTaskListsResult {
  taskLists: ITaskList[];
  tasks: ITask[];
}

export interface IDeleteTaskListByIdArgs {
  id: string;
}

export interface IDeleteTaskListByIdResult {
  deletedTaskListId: string;
  tasksIds: string[];
}
