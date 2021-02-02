import * as api from '../api';
import { CALL_API } from '../middleware/api';

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks() {
    return fetchTaskStarted();
}

export function fetchTaskStarted() {
    return {
        type: 'FETCH_TASKS_STARTED'
    }
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: tasks
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

function progressTimerStart(taskId) {
    return {
        type: 'TIMER_STARTED',
        payload: { taskId }
    }
}

function progressTimerStop(taskId) {
    return {
        type: 'TIMER_STOPPED',
        payload: {
            taskId
        }
    }
}

export function editTask(id, params) {
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.content, id);
        const updatedTask = Object.assign({}, task, params);
        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
            if (resp.data.status === 'In Progress') {
                dispatch(progressTimerStart(resp.data.id));
            }
            if (task.status === 'In Progress') {
                return dispatch(progressTimerStop(resp.data.id));
            }
        })
    }
}

export function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: { task },
    }
}

function getTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}