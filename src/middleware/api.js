import axios from 'axios';
export const CALL_API = 'CALL_API';

const API_BASE_URL = 'http://localhost:3001';

function makeCall(endpoint) {
    const url = `${API_BASE_URL}${endpoint}`;

    return axios.get(url)
}

const apiMiddleware = store => next => action => {
    console.log('action in apiMiddleware: ', action);
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action);
    }

    const [requestStartedType, successType, failureType] = callApi.types;
    next({ type: requestStartedType });
    return makeCall(callApi.endpoint).then(
        resp =>
            next({
                type: successType,
                payload: resp.data
            }),
        err =>
            next({
                type: failureType,
                payload: err.message
            })
    )
}

export default apiMiddleware;