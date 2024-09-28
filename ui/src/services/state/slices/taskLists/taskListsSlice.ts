import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { deleteTaskById, moveTaskToTaskList } from '../tasks/thunks';
import { deleteTaskListById, fetchTaskLists } from './thunks';

import { ITaskList } from '../types';
import { ITaskListsState } from './types';
import { RootState } from '../../store/types';

const taskListsAdapter = createEntityAdapter<ITaskList>();
const initialState = taskListsAdapter.getInitialState<ITaskListsState>({
  status: 'init'
});

const taskListsSlice = createSlice({
  name: 'taskLists',
  initialState,
  reducers: {},
  selectors: {
    selectStatus: (state) => state.status
  },
  extraReducers: (builder) => {
    // Fetch task lists
    builder.addCase(fetchTaskLists.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchTaskLists.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      taskListsAdapter.setAll(state, payload.taskLists);
    });
    builder.addCase(fetchTaskLists.rejected, (state) => {
      state.status = 'failed';
    });
    // Delete task list by id
    builder.addCase(deleteTaskListById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(deleteTaskListById.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      taskListsAdapter.removeOne(state, payload.deletedTaskListId);
    });
    builder.addCase(deleteTaskListById.rejected, (state) => {
      state.status = 'failed';
    });

    // Delete task by id
    builder.addCase(deleteTaskById.fulfilled, (state, { payload }) => {
      const taskList = state.entities[payload.taskListId];
      taskList.tasksIds = taskList.tasksIds.filter(
        (id) => id !== payload.deletedTaskId
      );

      taskListsAdapter.updateOne(state, {
        id: taskList.id,
        changes: taskList
      });
    });
    // Move task to task list
    builder.addCase(moveTaskToTaskList.fulfilled, (state, { payload }) => {
      const prevTaskList = state.entities[payload.fromTaskListId];
      prevTaskList.tasksIds = prevTaskList.tasksIds.filter(
        (id) => id !== payload.movedTaskId
      );

      const newTaskList = state.entities[payload.toTaskListId];
      newTaskList.tasksIds.push(payload.movedTaskId);

      taskListsAdapter.updateMany(state, [
        {
          id: prevTaskList.id,
          changes: prevTaskList
        },
        {
          id: newTaskList.id,
          changes: newTaskList
        }
      ]);
    });
  }
});

export const taskListsSelectors = {
  ...taskListsAdapter.getSelectors<RootState>((state) => state.taskLists),
  ...taskListsSlice.selectors
};

export default taskListsSlice.reducer;
