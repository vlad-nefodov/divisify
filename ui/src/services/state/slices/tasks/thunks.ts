import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkDependencies } from '../../store/types';
import {
  IDeleteTaskByIdArgs,
  IDeleteTaskByIdResult,
  IMoveTaskToTaskListArgs,
  IMoveTaskToTaskListResult
} from './types';

const deleteTaskById = createAsyncThunk<
  IDeleteTaskByIdResult,
  IDeleteTaskByIdArgs,
  IThunkDependencies
>('tasks/deleteTaskById', async (args, { extra }) => {
  const { taskRepository } = extra;
  const deletedListEntity = await taskRepository.deleteById(args.id);

  return {
    deletedTaskId: deletedListEntity.id,
    taskListId: deletedListEntity.taskListId
  };
});

const moveTaskToTaskList = createAsyncThunk<
  IMoveTaskToTaskListResult,
  IMoveTaskToTaskListArgs,
  IThunkDependencies
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
