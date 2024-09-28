import { FC } from 'react';
import TaskBoard from '../components/TaskBoard/TaskBoard';

const HomePage: FC = () => {
  return (
    <div className='home-page'>
      <TaskBoard />
    </div>
  );
};

export default HomePage;
