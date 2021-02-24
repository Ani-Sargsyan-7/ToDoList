import * as actionType from './actionType';


const initState = {
    tasks: [],
    deletingTask:false,
    addingTask: false,
    editingTask: false,
    savingTask: false,
}

export default function reducer(state= initState, action){
  
switch (action.type) {

  case actionType.PENDING:
        return {
          ...state,
          deletingTask:false,
          addingTask: false,
          editingTask: false,
          savingTask: false,
        };

    case actionType.GET_TASKS:
        return {
          ...state,
          tasks: action.tasks,
        };

    case actionType.ADD_TASK:
        return {
          ...state,
          tasks:[...state.tasks, action.task],
          addingTask:true

        };

        case actionType.DELETE_TASK:
          return{
            ...state,
            tasks:state.tasks.filter((task) => action.taskId !== task._id)
          };

        case actionType.DELETE_CHECKED_TASKS: {
          const newTasks = state.tasks.filter((task) => {
            if (action.ids.has(task._id)) {
                return false;
            }
            return true;
        });
          return{
            ...state,
            tasks:newTasks,
            deletingTask: true 
          }
        };

        case actionType.EDIT_TASK: {
          const tasks = [...state.tasks]  
          const taskIndex = tasks.findIndex(task => task._id === action.editedTask._id);
          tasks[taskIndex] = action.editedTask;
          
          return{
              ...state,
              tasks,
              editingTask: true,
          }
        
        };

        case actionType.SAVE_TASK:
          return{
            ...state,
            tasks:[...state.tasks],
            savingTask: true,
        }

  default:
    return state;
};
 
};




