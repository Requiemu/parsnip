import './App.css';
import React from 'react';
import TasksPage from './components/TasksPage';

import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function App(props) {
  return (
    <div className='main-content'>
      <TasksPage tasks={props.tasks}></TasksPage>
    </div>
  );
}

export default connect(mapStateToProps)(App);
