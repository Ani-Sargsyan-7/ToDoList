const initState = {
    deletingTask:false,
    addingTask: false,
    tasks:[]
}

export default function reducer(state= initState, action){
  
switch (action.type) {
  case "INCREMENT":
    
    return{
      ...state,
      count:state.count + 1
    };
  case "DECREMENT" :
    
    return{
      ...state,
      count:state.count - 1
    };
    case 'GET_TASKS':
        return {
          ...state,
          tasks: action.tasks,
          showNewTaskModal: action.showNewTaskModal,
        };
    case 'ADD_NEW_TASK':
        return {
          ...state,
          tasks:[...state.tasks, action.task],
          addingTask:true

        };
        case 'ADDING_TASK':
          return {
            ...state,
            addingTask: false
          };
           
        case 'REMOVE_TASK':
          return{
            ...state,
            tasks:state.tasks.filter((task) => action.taskId !== task._id)
          };
        case 'DELETE_TASKS':{
          const tasks = state.tasks.filter((task) => {
            if (action.ids.has(task._id)) {
                return false;
            }
            return true;
        });
          return{
            ...state,
            tasks,
            deletingTask: true 
          }
        };
        case 'DELETING_TASK':
          return {
            ...state,
            deletingTask: false
          };
        case 'EDIT_TASK':{
          const taskIndex = state.tasks.findIndex(task => task._id === action.editTask._id);
          state.tasks[taskIndex] = action.editTask;
          
          return{
              tasks:taskIndex,
              editTask: null
          }
        
        }
  default:
    return state;
};
 
};




