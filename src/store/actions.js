import request from '../helpers/request';
import {requestWithouthToken} from '../helpers/request';
import * as actionType from './actionType';
import {history} from '../helpers/history';
import {saveToken} from '../helpers/auth';

const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                if(!tasks)  return;
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
                if(!task)  return;
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
                if(!task)  return;
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
            .then((res) => {
                if(!res)  return;
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
            .then((res) => {
                if(!res)  return;
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
                if(!editedTask)  return;
                dispatch({
                    type: actionType.EDIT_TASK,
                    editedTask,
                    from,
                    status: data.status
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

// export function sendMessage(inputValues){
//     return (dispatch) => {

//         requestWithouthToken(`${apiHost}/form`, 'POST', inputValues)
//             .then(() => {
//                 dispatch({
//                     type: actionType.SEND_MESSAGE,
                    
//                 });
//             })
//             .catch((err) => {
//                 dispatch({
//                     type: actionType.ERROR,
//                     error: err.message
//                 });
//             });
//     }
// };

export function register(data) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        requestWithouthToken(`${apiHost}/user`, 'POST', data)
            .then(() => {
                dispatch({
                    type: actionType.REGISTER,
                });
                history.push('/login');
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};
export function login(data) {
    return (dispatch) => {
        dispatch({
            type: actionType.PENDING
        });

        requestWithouthToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then((res) => {
                saveToken(res);
    
                dispatch({
                    type: actionType.LOGIN,
                });
                history.push('/');
            })
            .catch((err) => {
                dispatch({
                    type: actionType.ERROR,
                    error: err.message
                });
            });
    }
};

