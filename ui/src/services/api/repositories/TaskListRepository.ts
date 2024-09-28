import { ITaskList } from '../entities';
import BaseRepository from './base/BaseRepository';

export interface ITaskListRepository extends BaseRepository<ITaskList> {}

export class TaskListRepository
  extends BaseRepository<ITaskList>
  implements ITaskListRepository
{
  protected override _collectionName = 'task-lists';
}
