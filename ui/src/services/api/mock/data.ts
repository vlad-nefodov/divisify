import { Task, TaskList } from '../entities';

export const taskListsMockData: TaskList[] = [
  {
    id: '1',
    name: 'Task List 1',
    tasks: [
      {
        id: '1',
        taskListId: '1',
        name: 'Task 1.1',
        description: 'Description of Task 1.1',
        dueDate: new Date('2024-05-15').toISOString(),
        priority: 'medium'
      },
      {
        id: '2',
        taskListId: '1',
        name: 'Task 1.2',
        description: 'Description of Task 1.2',
        dueDate: new Date('2024-05-16').toISOString(),
        priority: 'high'
      }
    ]
  },
  {
    id: '2',
    name: 'Task List 2',
    tasks: [
      {
        id: '3',
        taskListId: '2',
        name: 'Task 2.1',
        description: 'Description of Task 2.1',
        dueDate: new Date('2024-05-17').toISOString(),
        priority: 'low'
      }
    ]
  },
  {
    id: '3',
    name: 'Task List 3',
    tasks: [
      {
        id: '4',
        taskListId: '3',
        name: 'Task 3.1',
        description: 'Description of Task 3.1',
        dueDate: new Date('2024-05-18').toISOString(),
        priority: 'medium'
      }
    ]
  },
  {
    id: '4',
    name: 'Task List 4',
    tasks: [
      {
        id: '5',
        taskListId: '4',
        name: 'Task 4.1',
        description: 'Description of Task 4.1',
        dueDate: new Date('2024-05-19').toISOString(),
        priority: 'high'
      },
      {
        id: '6',
        taskListId: '4',
        name: 'Task 4.2',
        description: 'Description of Task 4.2',
        dueDate: new Date('2024-05-20').toISOString(),
        priority: 'low'
      }
    ]
  }
];

export const tasksMockData: Task[] = [
  {
    id: '1',
    taskListId: '1',
    name: 'Task 1.1',
    description: 'Description of Task 1.1',
    dueDate: new Date('2024-05-15').toISOString(),
    priority: 'medium'
  },
  {
    id: '2',
    taskListId: '1',
    name: 'Task 1.2',
    description: 'Description of Task 1.2',
    dueDate: new Date('2024-05-16').toISOString(),
    priority: 'high'
  },
  {
    id: '3',
    taskListId: '2',
    name: 'Task 2.1',
    description: 'Description of Task 2.1',
    dueDate: new Date('2024-05-17').toISOString(),
    priority: 'low'
  },
  {
    id: '4',
    taskListId: '3',
    name: 'Task 3.1',
    description: 'Description of Task 3.1',
    dueDate: new Date('2024-05-18').toISOString(),
    priority: 'medium'
  },
  {
    id: '5',
    taskListId: '4',
    name: 'Task 4.1',
    description: 'Description of Task 4.1',
    dueDate: new Date('2024-05-19').toISOString(),
    priority: 'high'
  },
  {
    id: '6',
    taskListId: '4',
    name: 'Task 4.2',
    description: 'Description of Task 4.2',
    dueDate: new Date('2024-05-20').toISOString(),
    priority: 'low'
  }
];
