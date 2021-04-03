import * as actionType from './actionType';
import {checkLoginStatus} from '../helpers/auth';


const initState = {
  tasks: [],
  task: null,
  user:null,
  deletingTask: false,
  addingTask: false,
  editingTask: false,
  editingOneTask: false,
  loading: false,
  successMessage: null,
  errorMessage: null,
  isAuth: checkLoginStatus(),
  successSend: false
};



export default function reducer(state = initState, action) {

  switch (action.type) {

    case actionType.PENDING:
      return {
          ...state,
          loading: true,
          successMessage: null,
          errorMessage: null,
          deletingTask: false,
          addingTask: false,
          editingTask: false,
          editingOneTask: false,
          successSend: false

      }

    case actionType.ERROR:
      return {
          ...state,
          loading: false,
          errorMessage: action.error
      }

    case actionType.GET_TASKS:
      return {
          ...state,
          tasks: action.tasks,
          loading: false,
      }

    case actionType.GET_ONE_TASK:
      return {
          ...state,
          task: action.task,
          loading: false,
      }
      
      case actionType.ADD_TASK:
        return {
            ...state,
            tasks: [action.task, ...state.tasks],
            addingTask: true,
            loading: false,
            successMessage: 'Task created successfully!'
        }

      case actionType.DELETE_TASK:{
        if(action.from === 'single'){
          return {
            ...state,
            task: null,
            loading: false,
            successMessage: 'Task deleted successfully!',
          };
        }
        return {
          ...state,
          loading: false,
          tasks: state.tasks.filter(task => action.taskId !== task._id),
          successMessage: 'Task deleted successfully!'
        };
      }

      case actionType.DELETE_CHECKED_TASKS: {
        const newTasks = state.tasks.filter((task) => {
          if (action.ids.has(task._id)) {
            return false;
          }
          return true;
        });
        return {
          ...state,
          loading: false,
          tasks: newTasks,
          deletingTask: true,
          successMessage: 'Tasks deleted successfully!'
        };
      }

    case actionType.EDIT_TASK: {

      let successMessage = 'Task edited successfully!';

      if (action.from === 'single') {
        return {
          ...state,
          task: action.editedTask,
          editingOneTask: true,
          loading: false,
          successMessage:action.status ? 
          ((action.status === 'done') ? 'The Task Completed!' : ' The Task is Active Now!'): 
          successMessage
        };

      };
      
      if(action.status){
        if(action.status === 'done'){
              successMessage = ' The Task Completed!'
        }
        else{
            successMessage = ' The Task is Active Now!'          
        }
      };

      const tasks = [...state.tasks]
      const taskIndex = tasks.findIndex(task => task._id === action.editedTask._id);
      tasks[taskIndex] = action.editedTask;

      return {
        ...state,
        tasks,
        loading: false,
        editingTask: true,
        successMessage
      };
    }

    case actionType.SEND_MESSAGE:
      return{
        ...state,
        successSend:true,
        loading: false, 
        successMessage: 'You send massage successfully!'  
      }

      case actionType.REGISTER:
        return {
            ...state,
            loading: false,
            successMessage: 'You registered successfully!'
        }

      case actionType.LOGIN:
        return {
            ...state,
            loading: false,
            isAuth: true
        }

      case actionType.LOGOUT:
        return {
            ...state,
            loading: false,
            isAuth: false
        }
      case actionType.GET_USER_INFO:
        return {
            ...state,
            loading:false,
            user:`${action.user.name} ${action.user.surname}`,
            isAuth: true,
        }

  default:
    return state;
  };
};