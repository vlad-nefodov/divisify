export interface IEntity {
  id: string;
}

export interface ITask extends IEntity {
  taskListId: string;
  name: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ITaskList extends IEntity {
  name: string;
  tasks: ITask[];
}
