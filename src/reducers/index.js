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
                content: action.payload.tasks
            }
        } case ("CREATE_TASK_SUCCEEDED"): {
            return {
                isLoading: false,
                content: state.content.concat(action.payload.task)
            }
        }
    }
    return state;
}
