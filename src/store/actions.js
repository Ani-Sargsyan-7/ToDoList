import request from '../helpers/request';


  export function getTasks(){
    return (dispatch)=>{
        request('http://localhost:3001/task')
        .then((tasks)=>{
        dispatch({type: 'GET_TASKS', tasks: tasks});
        });
    }
};

export function  removeTask(taskId){
    return (dispatch)=>{
        dispatch({type: 'REMOVE_TASK'});
        request(`http://localhost:3001/task/${taskId}`,'DELETE')
        .then(()=>{
            dispatch({type: 'REMOVE_TASK',  taskId});
            });
    }
};

export function addTask(newTask){
    return (dispatch)=>{
        dispatch({type: 'ADD_NEW_TASK'});
        request('http://localhost:3001/task','POST', newTask)
        .then((task)=>{
            dispatch({type: 'ADD_NEW_TASK',  task});
            });
    }
};

export function deleteCheckedTasks(ids){
        return (dispatch)=>{
            request(`http://localhost:3001/task`, 'PATCH',{
                tasks :[...ids]
            })
            .then(()=>{
                dispatch({type:'DELETE_TASKS', ids});
            });
        }

};

export function saveTask(editTask){
    return (dispatch)=>{
        request(`http://localhost:3001/task/${editTask._id}`, 'PUT', editTask,{
        
        })
        .then((editTask)=>{
            
            dispatch({type:'EDIT_TASK', editTask});
        });
    }
}