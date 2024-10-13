export type EntityStatus = 'init' | 'loading' | 'succeeded' | 'failed';

export interface EntityState {
  status: EntityStatus;
}

export interface TaskList {
  id: string;
  name: string;
  tasksIds: string[];
}

export interface Task extends EntityState {
  id: string;
  taskListId: string;
  name: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}
