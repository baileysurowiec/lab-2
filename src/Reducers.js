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
      };
      return [newTodo, ...state];
    case "DELETE_TODO":
      return state.filter(deleteItem => deleteItem.id !== action.id);
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