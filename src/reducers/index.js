export default function tasksReducer(state = { isLoading: false, content: [] }, action) {
    switch (action.type) {
        case ("EDIT_TASK_SUCCEEDED"): {
            const { payload } = action;
            const result = {
                isLoading: false,
                content: state.content.map(task => {
                    if (task.id === payload.task.id) {
                        return Object.assign({}, task, payload.task);
                    }
                    return task;
                })
            }
            return result;
        } case ("FETCH_TASKS_STARTED"): {
            return {
                ...state,
                isLoading: true
            }
        } case ("FETCH_TASKS_SUCCEEDED"): {
            return {
                isLoading: false,
                content: action.payload
            }
        } case ("FETCH_TASKS_FAILED"): {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        } case ("CREATE_TASK_SUCCEEDED"): {
            return {
                isLoading: false,
                content: state.content.concat(action.payload.task)
            }
        } case ("TIMER_INCREMENT"): {
            const nextTasks = state.content.map(task => {
                if (task.id === action.payload.taskId) {
                    return {...task, timer: task.timer + 1}
                }
                return task;
            })
            return {...state, content: nextTasks};
        }
    }
    return state;
}
