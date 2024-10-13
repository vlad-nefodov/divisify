import {
  DeleteTaskByIdArgs,
  DeleteTaskByIdResult,
  MoveTaskToTaskListArgs,
  MoveTaskToTaskListResult
} from './types';

import { ThunkDependencies } from '../../store/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const deleteTaskById = createAsyncThunk<
  DeleteTaskByIdResult,
  DeleteTaskByIdArgs,
  ThunkDependencies
>('tasks/deleteTaskById', async (args, { extra }) => {
  const { taskRepository } = extra;
  const deletedListEntity = await taskRepository.deleteById(args.id);

  return {
    deletedTaskId: deletedListEntity.id,
    taskListId: deletedListEntity.taskListId
  };
});

const moveTaskToTaskList = createAsyncThunk<
  MoveTaskToTaskListResult,
  MoveTaskToTaskListArgs,
  ThunkDependencies
>('tasks/moveTaskToTaskList', async (args, { extra }) => {
  const { taskRepository } = extra;
  const prevTaskEntity = await taskRepository.update(args.taskId, {
    taskListId: args.listId
  });

  return {
    movedTaskId: args.taskId,
    fromTaskListId: prevTaskEntity.taskListId,
    toTaskListId: args.listId
  };
});

export { deleteTaskById, moveTaskToTaskList };
