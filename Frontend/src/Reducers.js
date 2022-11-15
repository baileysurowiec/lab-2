function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return{
        username: action.username,
        access_token: action.access_token,
      };      
    case "LOGOUT":
      return null;
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
        // trying _id instead
        id: action._id,
        dateCreated: action.dateCreated,
        isComplete: action.isComplete,
      };
      return [newTodo, ...state];
      
    case "FETCH_TODOS":
      return action.todos;

    case "CLEAR_POSTS":
      return [];

    case "DELETE_TODO":
      return state.filter(deleteItem => deleteItem.id !== action.id);
    
      // needs to be fixed, redundent to toggletodoitem
      // fixed and simplified
      case "TOGGLE_TODO":
        return state.map((toToggle) => {
          // look for todo with same id
          if (toToggle.id === action.id) {
            return {
              // copy and update the new values
              ...toToggle,
              dateCompleted: action.dateCompleted,
              complete: action.complete,
            };
          }
          return toToggle;
        });
      
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