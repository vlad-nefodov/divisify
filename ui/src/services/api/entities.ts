export interface Entity {
  id: string;
}

export interface Task extends Entity {
  taskListId: string;
  name: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskList extends Entity {
  name: string;
  tasks: Task[];
}
