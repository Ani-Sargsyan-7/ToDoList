import request from '../helpers/request';
import * as actionType from './actionType';
import {history} from '../helpers/history'



export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`http://localhost:3001/task?${query}`)
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

        request(`http://localhost:3001/task/${taskId}`)
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

        request('http://localhost:3001/task', 'POST', newTask)
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

        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
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

        request(`http://localhost:3001/task`, 'PATCH', {
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

export function editTask(data, from) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {

                dispatch({
                    type: actionType.EDIT_TASK,
                    editedTask,
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


