import './App.css';
import React from 'react';
import TasksPage from './components/TasksPage';

import { createTask, editTask } from './actions';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function App(props) {
  
  function onCreateTask({title, description}) {
    props.dispatch(createTask({title, description}));
  }

  const onStatusChange = (id, status) => {
    console.log('onStatusChange: ', id, status)
    props.dispatch(editTask(id, { status }))
  }

  return (
    <div className='main-content'>
      <TasksPage tasks={props.tasks} onCreateTask={onCreateTask} onStatusChange={onStatusChange}></TasksPage>
    </div>
  );
}

export default connect(mapStateToProps)(App);
