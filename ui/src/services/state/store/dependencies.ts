import { Dependencies } from './types';
import { TaskListRepository } from '../../api/repositories/TaskListRepository';
import { TaskRepository } from '../../api/repositories/TaskRepository';

const dependencies: Dependencies = {
  taskListRepository: new TaskListRepository(),
  taskRepository: new TaskRepository()
};

export default { extraArgument: dependencies };
