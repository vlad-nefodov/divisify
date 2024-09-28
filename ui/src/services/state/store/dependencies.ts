import { TaskListRepository } from '../../api/repositories/TaskListRepository';
import { TaskRepository } from '../../api/repositories/TaskRepository';
import { IDependencies } from './types';

const dependencies: IDependencies = {
  taskListRepository: new TaskListRepository(),
  taskRepository: new TaskRepository()
};

export default { extraArgument: dependencies };
