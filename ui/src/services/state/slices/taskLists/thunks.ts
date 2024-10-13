import {
  DeleteTaskListByIdArgs,
  DeleteTaskListByIdResult,
  FetchTaskListsResult
} from './types';
import { Task, TaskList } from '../types';

import { ThunkDependencies } from '../../store/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchTaskLists = createAsyncThunk<
  FetchTaskListsResult,
  void,
  ThunkDependencies
>('taskLists/fetchTaskLists', async (_, { extra }) => {
  const { taskListRepository } = extra;
  const taskListsEntities = await taskListRepository.getAll();

  // Normalize data
  const tasks: Task[] = taskListsEntities.flatMap((tl) =>
    tl.tasks.map((t) => ({ ...t, status: 'init' }))
  );
  const taskLists: TaskList[] = taskListsEntities.map(({ tasks, ...tl }) => ({
    ...tl,
    tasksIds: tasks.map((t) => t.id)
  }));

  return {
    tasks,
    taskLists
  };
});

const deleteTaskListById = createAsyncThunk<
  DeleteTaskListByIdResult,
  DeleteTaskListByIdArgs,
  ThunkDependencies
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
