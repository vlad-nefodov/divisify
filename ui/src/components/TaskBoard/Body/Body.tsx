import { ComponentPropsWithoutRef, FC } from 'react';

import Col from './Col/Col';
import { TaskList } from '../../../services/state/slices/types';
import styles from './Body.module.scss';

export interface BodyProps extends ComponentPropsWithoutRef<'div'> {
  taskLists: TaskList[];
}

const Body: FC<BodyProps> = (props) => {
  return (
    <div className={styles.body}>
      {props.taskLists.map((l, _, lists) => (
        <Col taskList={l} taskLists={lists} key={l.id} />
      ))}
    </div>
  );
};

export default Body;
