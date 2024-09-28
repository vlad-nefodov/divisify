export type EntityStatus = 'init' | 'loading' | 'succeeded' | 'failed';

export interface IEntityState {
  status: EntityStatus;
}

export interface ITaskList {
  id: string;
  name: string;
  tasksIds: string[];
}

export interface ITask extends IEntityState {
  id: string;
  taskListId: string;
  name: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}
