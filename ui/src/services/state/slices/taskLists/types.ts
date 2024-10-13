import { EntityState, Task, TaskList } from '../types';

export interface TaskListsState extends EntityState {}

export interface FetchTaskListsResult {
  taskLists: TaskList[];
  tasks: Task[];
}

export interface DeleteTaskListByIdArgs {
  id: string;
}

export interface DeleteTaskListByIdResult {
  deletedTaskListId: string;
  tasksIds: string[];
}
