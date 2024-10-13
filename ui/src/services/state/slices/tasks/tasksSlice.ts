import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { deleteTaskById, moveTaskToTaskList } from './thunks';
import { deleteTaskListById, fetchTaskLists } from '../taskLists/thunks';

import { RootState } from '../../store/types';
import { Task } from '../types';

const tasksAdapter = createEntityAdapter<Task>();
const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Delete task by id
    builder.addCase(deleteTaskById.pending, (state, { meta }) => {
      tasksAdapter.updateOne(state, {
        id: meta.arg.id,
        changes: {
          status: 'loading'
        }
      });
    });
    builder.addCase(deleteTaskById.fulfilled, (state, { payload }) => {
      tasksAdapter.removeOne(state, payload.deletedTaskId);
    });
    builder.addCase(deleteTaskById.rejected, (state, { meta }) => {
      tasksAdapter.updateOne(state, {
        id: meta.arg.id,
        changes: {
          status: 'failed'
        }
      });
    });
    // Move task to task list
    builder.addCase(moveTaskToTaskList.pending, (state, { meta }) => {
      tasksAdapter.updateOne(state, {
        id: meta.arg.taskId,
        changes: {
          status: 'loading'
        }
      });
    });
    builder.addCase(moveTaskToTaskList.fulfilled, (state, { payload }) => {
      tasksAdapter.updateOne(state, {
        id: payload.movedTaskId,
        changes: {
          taskListId: payload.toTaskListId,
          status: 'succeeded'
        }
      });
    });
    builder.addCase(moveTaskToTaskList.rejected, (state, { meta }) => {
      tasksAdapter.updateOne(state, {
        id: meta.arg.taskId,
        changes: {
          status: 'failed'
        }
      });
    });

    // Fetch task lists
    builder.addCase(fetchTaskLists.fulfilled, (state, { payload }) => {
      tasksAdapter.setAll(state, payload.tasks);
    });
    // Delete task list by id
    builder.addCase(deleteTaskListById.fulfilled, (state, { payload }) => {
      tasksAdapter.removeMany(state, payload.tasksIds);
    });
  }
});

export const tasksSelectors = tasksAdapter.getSelectors<RootState>(
  (state) => state.tasks
);

export default tasksSlice.reducer;
