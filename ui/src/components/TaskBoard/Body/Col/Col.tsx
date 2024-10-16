import { ComponentPropsWithoutRef, FC } from 'react';

import Body from './Body/Body';
import Header from './Header/Header';
import { TaskList } from '../../../../services/state/slices/types';
import styles from './Col.module.scss';

export interface ColProps extends ComponentPropsWithoutRef<'div'> {
  taskList: TaskList;
  taskLists: TaskList[];
}

const Col: FC<ColProps> = (props) => {
  const { taskList, taskLists } = props;

  return (
    <div className={styles.col}>
      <Header
        listId={taskList.id}
        title={taskList.name}
        count={taskList.tasksIds.length}
      />
      <Body tasksIds={taskList.tasksIds} lists={taskLists} />
    </div>
  );
};

export default Col;
