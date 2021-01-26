import { uniqueId } from '../actions';

const mockTasks = [
    {
        id: uniqueId(),
        title: 'Learn Redux',
        description: 'The store, actions, and reducers, oh my!',
        status: 'In Progress',
    },
    {
        id: uniqueId(),
        title: 'Peace on Earth',
        description: 'No big deal.',
        status: 'Unstarted'
    }
  
  ];

export default function tasks(state={ tasks: mockTasks}, action) {
    console.log('reducer tasks: ', action)
    if (action.type === "CREATE_TASK") {
        return {tasks: state.tasks.concat(action.payload)};
    } else if (action.type === "EDIT_TASK") {
        const { payload } = action;
        const result = {
            tasks: state.tasks.map(task => {
                if (task.id === payload.id) {
                    return Object.assign({}, task, payload.params);
                }
                return task;
            })
        }
        console.log('final state: ', result)
        return result;
    }
    console.log('final state: ', state)
    return state;
}
