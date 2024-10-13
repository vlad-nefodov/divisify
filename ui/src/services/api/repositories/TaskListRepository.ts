import { TaskList } from '../entities';
import BaseRepository from './base/BaseRepository';

export class TaskListRepository extends BaseRepository<TaskList> {
  protected override _collectionName = 'task-lists';
}
