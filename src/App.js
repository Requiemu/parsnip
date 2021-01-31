import './App.css';
import React, { useEffect } from 'react';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';

import { createTask, editTask, fetchTasks } from './actions';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function App(props) {

  useEffect(() => {
    props.dispatch(fetchTasks());
  }, [])

  function onCreateTask({ title, description }) {
    props.dispatch(createTask({ title, description, status: 'Unstarted' }));
  }

  const onStatusChange = (id, status) => {
    console.log('onStatusChange: ', id, status)
    props.dispatch(editTask(id, { status }))
  }

  return (
    <div className="container">
      {props.tasks.error && <FlashMessage message={props.error}/>}
      <div className='main-content'>
        <TasksPage
          tasks={props.tasks.content}
          onCreateTask={onCreateTask}
          onStatusChange={onStatusChange}
          isLoading={props.tasks.isLoading}
        ></TasksPage>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
