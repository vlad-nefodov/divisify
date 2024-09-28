import { ITask } from '../entities';
import BaseRepository from './base/BaseRepository';

export interface ITaskRepository extends BaseRepository<ITask> {}

export class TaskRepository
  extends BaseRepository<ITask>
  implements ITaskRepository
{
  protected override _collectionName = 'tasks';
}
