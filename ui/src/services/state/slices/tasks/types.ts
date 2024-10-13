export interface DeleteTaskByIdArgs {
  id: string;
}

export interface DeleteTaskByIdResult {
  deletedTaskId: string;
  taskListId: string;
}

export interface MoveTaskToTaskListArgs {
  taskId: string;
  listId: string;
}

export interface MoveTaskToTaskListResult {
  movedTaskId: string;
  fromTaskListId: string;
  toTaskListId: string;
}
