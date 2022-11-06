function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        title: action.title,
        content: action.content,
        author: action.author,
        id: action.id,
        dateCreated: action.dateCreated,
        dispatch: action.dispatch,
        isComplete: false,
        dateCompleted: ""
      };
      return [newTodo, ...state];
      
    case "FETCH_TODOS":
      return action.todos;

    case "DELETE_TODO":
      return state.filter(deleteItem => deleteItem.id !== action.id);
    
      case "TOGGLE_TODO":
      // get index of completed todo
      const i = state.findIndex(todoItem => todoItem.id === action.id);
      // set toggle to that item
      const toToggle = state[i];
      // retieve remaining list
      const start = state.slice(0, i);
      const end = state.slice(i+1, state.length);
      if(toToggle.isComplete === false){
      // update toggled item
         const toggleComplete = {
          title: toToggle.title,
          content: toToggle.content,
          author: toToggle.author,
          id: toToggle.id,
          dateCreated: toToggle.dateCreated,
          dispatch: toToggle.dispatch,
          isComplete: true,
          dateCompleted: (new Date(Date.now())).toString(),
        }
        return [...start, toggleComplete, ...end];
      }
      else{
        // undo complete
         const toggleNotComplete = {
          title: toToggle.title,
          content: toToggle.content,
          author: toToggle.author,
          id: toToggle.id,
          dateCreated: toToggle.dateCreated,
          dispatch: toToggle.dispatch,
          isComplete: false,
          dateCompleted: "",
        }
        return [...start, toggleNotComplete, ...end];
      }
      
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}