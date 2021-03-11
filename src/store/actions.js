import request from '../helpers/request';
import * as actionType from './actionType';
import {history} from '../helpers/history'

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({
                    type: actionType.GET_TASKS,
                    tasks: tasks
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

export function getOneTask(taskId) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task/${taskId}`)
            .then((task) => {

                dispatch({
                    type: actionType.GET_ONE_TASK,
                    task
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                dispatch({
                    type: actionType.ADD_TASK,
                    task
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};


export function removeTask(taskId, from) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({
                    type: actionType.DELETE_TASK,
                    taskId, 
                    from
                });
                if (from === 'single') {
                    history.push('/');
                }
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

export function deleteCheckedTasks(ids) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task`, 'PATCH', {
                tasks: [...ids]
            })
            .then(() => {
                dispatch({
                    type: actionType.DELETE_CHECKED_TASKS,
                    ids
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

export function editTask(data, from,) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {

                dispatch({
                    type: actionType.EDIT_TASK,
                    editedTask,
                    from
                });
                if (from === 'single') {
                    
                }
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

export function sendMessage(inputValues){
    return (dispatch) => {

        request(`${apiHost}/form`, 'POST', inputValues)
            .then(() => {
                dispatch({
                    type: actionType.SEND_MESSAGE,
                    
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};


