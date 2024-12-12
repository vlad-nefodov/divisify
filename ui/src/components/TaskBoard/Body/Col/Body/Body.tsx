import { ComponentPropsWithoutRef, FC } from 'react';

import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskList } from '@/services/state/slices/types';
import styles from './Body.module.scss';

export interface BodyProps extends ComponentPropsWithoutRef<'div'> {
  tasksIds: string[];
  lists: TaskList[];
}

const Body: FC<BodyProps> = ({ tasksIds, lists }) => {
  return (
    <div className={styles.body}>
      {tasksIds.map((taskId) => (
        <TaskCard
          key={taskId}
          taskId={taskId}
          lists={lists.filter((l) => !l.tasksIds.includes(taskId))}
          onEdit={() => {}}
        />
      ))}
    </div>
  );
};

export default Body;
