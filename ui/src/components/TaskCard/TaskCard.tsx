import './TaskCard.css';

import { ComponentPropsWithoutRef, FC } from 'react';
import TaskCardBody from './TaskCardBody/TaskCardBody';

import TaskCardHeader from './TaskCardHeader/TaskCardHeader';
import classNames from '../../utils/classNames';
import { ITaskList } from '../../services/state/slices/types';
import {
  useAppDispatch,
  useAppSelector
} from '../../services/state/store/types';
import { tasksSelectors } from '../../services/state/slices/tasks/tasksSlice';
import {
  deleteTaskById,
  moveTaskToTaskList
} from '../../services/state/slices/tasks/thunks';
import Loader from '../ui/Loader/Loader';

export interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
}
export interface TaskCardProps extends ComponentPropsWithoutRef<'div'> {
  taskId: string;
  lists: ITaskList[];
  onEdit: (taskId: string) => void;
}

const TaskCard: FC<TaskCardProps> = (props) => {
  const { taskId, lists, onEdit, className, ...rest } = props;
  const styleNames = classNames('task-card', className);

  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    tasksSelectors.selectById(state, taskId)
  );

  if (!task) return null;

  const onEditHandler = () => onEdit(task.id);
  const onDeleteHandler = () => dispatch(deleteTaskById({ id: task.id }));
  const onChangeListHandler = (listId: string) =>
    dispatch(moveTaskToTaskList({ taskId: task.id, listId }));

  return (
    <div className={styleNames} {...rest}>
      <TaskCardHeader
        {...task}
        onEdit={onEditHandler}
        onDelete={onDeleteHandler}
      />
      {task.status === 'loading' ? (
        <Loader />
      ) : (
        <TaskCardBody
          {...task}
          priority={task.priority}
          lists={lists}
          onChangeList={onChangeListHandler}
        />
      )}
    </div>
  );
};

export default TaskCard;
