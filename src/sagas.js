import { fork, take, put, call, takeLatest, takeEvery, delay } from 'redux-saga/effects';
import reduxSaga from 'redux-saga';
import * as api from './api';

console.log('reduxSaga: ', reduxSaga);

export default function* rootSaga() {
    yield fork(watchFetchTasks);
    yield takeEvery('TIMER_STARTED', handleProgressTimer);
}

function* watchFetchTasks() {
    // while (true) {
    //     yield take('FETCH_TASKS_STARTED');
    //     try {
    //         const { data } = yield call(api.fetchTasks);
    //         yield put({
    //             type: 'FETCH_TASKS_SUCCEEDED',
    //             payload: data
    //         });
    //     } catch (e) {
    //         yield put({
    //             type: 'FETCH_TASKS_FAILED',
    //             payload: {error: e.message}
    //         })
    //     }
    //     console.log('started!');
    // }
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
}

function* fetchTasks() {
    try {
        const { data } = yield call(api.fetchTasks);
        yield put({
            type: 'FETCH_TASKS_SUCCEEDED',
            payload: data
        })
    } catch (e) {
        yield put({
            type: 'FETCH_TASKS_FAILED',
            payload: { error: e.message }
        })
    }
}

function* handleProgressTimer({ payload }) {
    while (true) {
        yield delay(1000);
        yield put({
            type: 'TIMER_INCREMENT',
            payload: { taskId: payload.taskId}
        })
    }
}