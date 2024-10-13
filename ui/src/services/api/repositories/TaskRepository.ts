import { Task } from '../entities';
import BaseRepository from './base/BaseRepository';

export class TaskRepository extends BaseRepository<Task> {
  protected override _collectionName = 'tasks';
}
