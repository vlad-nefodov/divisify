import './TaskCardBody.css';

import { ComponentPropsWithoutRef, FC } from 'react';
import {
  faCalendarDays,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import Badge from '../../ui/Badge/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../ui/Select/Select';
import { SelectValue } from '../../ui/Select/Select.types';
import classNames from '../../../utils/classNames';
import { format } from 'date-fns';

export interface TaskList {
  id: string;
  name: string;
}
export interface TaskCardBodyProps extends ComponentPropsWithoutRef<'div'> {
  description: string;
  dueDate: string;
  priority: string;
  lists: TaskList[];
  onChangeList: (id: string) => void;
}

const TaskCardBody: FC<TaskCardBodyProps> = (props) => {
  const { description, dueDate, priority, lists, onChangeList, className } =
    props;

  const styleNames = classNames('task-card__body', className);

  const onChangeListHandler = (value: SelectValue) => {
    if (typeof value === 'string') {
      onChangeList(value);
    }
  };

  const getListSelectItems = () => {
    return lists.map((b) => (
      <Select.Content.Item value={b.id} key={b.id}>
        {b.name}
      </Select.Content.Item>
    ));
  };

  return (
    <div className={styleNames}>
      <div className='task-card-body__description'>{description}</div>
      <div className='task-card-body__date'>
        <FontAwesomeIcon icon={faCalendarDays} />
        {format(dueDate, 'E, d MMM')}
      </div>
      <Badge className='task-card-body__priority' decorated>
        {priority}
      </Badge>
      <Select onValueChange={onChangeListHandler}>
        <Select.Trigger>
          <Select.Trigger.Value placeholder='Move to...' />
          <Select.Trigger.Icon>
            <FontAwesomeIcon icon={faChevronDown} />
          </Select.Trigger.Icon>
        </Select.Trigger>
        <Select.Content>{getListSelectItems()}</Select.Content>
      </Select>
    </div>
  );
};

export default TaskCardBody;
