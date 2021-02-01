import * as api from '../api';

export function fetchTasks() {
    return dispatch => {
        dispatch(fetchTaskStarted());
        api.fetchTasks().then(resp => {
            setTimeout(() => {
                dispatch(fetchTasksSucceeded(resp.data));                
            }, 2000);
            // throw new Error('Oh noes! Unable to fetch tasks!');
        }).catch((error) => {
            dispatch(fetchTasksFailed(error.message));
        })
    }
}

export function fetchTaskStarted() {
    return {
        type: 'FETCH_TASKS_STARTED'
    }
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks
        }
    }
}

export function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error,
        }
    }
}

export function createTask(task) {
    return dispatch => {
        api.createTask(task).then(resp => {
            dispatch(createTaskSucceeded(resp.data));
        });
    }
}

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task
        }
    }
}

export function editTask(id, params) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.content, id);
        const updatedTask = Object.assign({}, task, params);
        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        })
    }
}

export function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {task},
    }
}

function getTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}