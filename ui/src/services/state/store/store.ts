import { configureStore } from '@reduxjs/toolkit';

import taskListsReducer from '../slices/taskLists/taskListsSlice';
import tasksReducer from '../slices/tasks/tasksSlice';
import dependencies from './dependencies';

export const store = configureStore({
  reducer: {
    taskLists: taskListsReducer,
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: dependencies
    })
});
