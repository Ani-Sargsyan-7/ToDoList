import request from '../helpers/request';
import * as actionType from './actionType';


  export function getTasks(){
    return (dispatch)=>{
        dispatch({type:actionType.PENDING}); 

        request('http://localhost:3001/task')
        .then((tasks)=>{
        dispatch({type: actionType.GET_TASKS, tasks: tasks});
        });
    }
};

export function addTask(newTask){
    return (dispatch)=>{
        dispatch({type: actionType.PENDING});

        request('http://localhost:3001/task','POST', newTask)
        .then((task)=>{
            dispatch({type: actionType.ADD_TASK,  task});
            });
    }
};


export function  removeTask(taskId){
    return (dispatch)=>{
        dispatch({type:actionType.PENDING}); 

        request(`http://localhost:3001/task/${taskId}`,'DELETE')
        .then(()=>{
            dispatch({type: actionType.DELETE_TASK,  taskId});
            });
    }
};

export function deleteCheckedTasks(ids){
        return (dispatch)=>{
            dispatch({type: actionType.PENDING});
            
            request(`http://localhost:3001/task`, 'PATCH',{
                tasks :[...ids]
            })
            .then(()=>{
                dispatch({type:actionType.DELETE_CHECKED_TASKS, ids});
            });
        }

};

export function editTask(card){
    return (dispatch)=>{
        dispatch({type: actionType.PENDING});
        
        request(`http://localhost:3001/task/${card._id}`, 'PUT', card,{
        
        })
        .then((editedTask)=>{
            
            dispatch({type:actionType.EDIT_TASK, editedTask});
        });
    }
};


export function saveTask(card){
    return (dispatch)=>{
        dispatch({type: actionType.PENDING});
        
        request(`http://localhost:3001/task/${card._id}`, 'PUT', card,{
        
        })
        .then((editedTask)=>{
            
            dispatch({type:actionType.SAVE_TASK, editedTask});
        });
    }
}