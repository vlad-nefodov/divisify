import { createAsyncThunk } from '@reduxjs/toolkit';
import { IThunkDependencies } from '../../store/types';
import {
  IDeleteTaskListByIdArgs,
  IDeleteTaskListByIdResult,
  IFetchTaskListsResult
} from './types';
import { ITask, ITaskList } from '../types';

const fetchTaskLists = createAsyncThunk<
  IFetchTaskListsResult,
  void,
  IThunkDependencies
>('taskLists/fetchTaskLists', async (_, { extra }) => {
  const { taskListRepository } = extra;
  const taskListsEntities = await taskListRepository.getAll();

  // Normalize data
  const tasks: ITask[] = taskListsEntities.flatMap((tl) =>
    tl.tasks.map((t) => ({ ...t, status: 'init' }))
  );
  const taskLists: ITaskList[] = taskListsEntities.map(({ tasks, ...tl }) => ({
    ...tl,
    tasksIds: tasks.map((t) => t.id)
  }));

  return {
    tasks,
    taskLists
  };
});

const deleteTaskListById = createAsyncThunk<
  IDeleteTaskListByIdResult,
  IDeleteTaskListByIdArgs,
  IThunkDependencies
>('taskLists/deleteTaskListById', async (args, { extra }) => {
  const { taskListRepository } = extra;
  const deletedTaskListEntity = await taskListRepository.deleteById(args.id);
  const tasksIds = deletedTaskListEntity.tasks.map((t) => t.id);

  return {
    deletedTaskListId: deletedTaskListEntity.id,
    tasksIds
  };
});

export { fetchTaskLists, deleteTaskListById };
