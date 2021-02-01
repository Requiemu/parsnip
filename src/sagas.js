import { fork, take, put, call } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(watchFetchTasks);
    yield fork(watchSomethingElse);
}

function* watchFetchTasks() {
    while (true) {
        yield take('FETCH_TASKS_STARTED');
        try {
            const { data } = yield call(api.fetchTasks);
            yield put({
                type: 'FETCH_TASKS_SUCCEEDED',
                payload: { tasks: data }
            });
        } catch (e) {
            yield put({
                type: 'FETCH_TASKS_FAILED',
                payload: {error: e.message}
            })
        }
        console.log('started!');
    }
    console.log('watching!');
}

function* watchSomethingElse() {
    console.log('watching something else');
}