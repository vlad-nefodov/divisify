export interface IDeleteTaskByIdArgs {
  id: string;
}

export interface IDeleteTaskByIdResult {
  deletedTaskId: string;
  taskListId: string;
}

export interface IMoveTaskToTaskListArgs {
  taskId: string;
  listId: string;
}

export interface IMoveTaskToTaskListResult {
  movedTaskId: string;
  fromTaskListId: string;
  toTaskListId: string;
}
