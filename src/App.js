import './App.css';
import React from 'react';
import TasksPage from './components/TasksPage';

const mockTasks = [
  {
      id: 1,
      title: 'Learn Redux',
      description: 'The store, actions, and reducers, oh my!',
      status: 'In Progress',
  },
  {
      id: 2,
      title: 'Peace on Earth',
      description: 'No big deal.',
      status: 'Unstarted'
  }

];

function App() {
  return (
    <div className='main-content'>
      <TasksPage tasks={mockTasks}></TasksPage>
    </div>
  );
}

export default App;
