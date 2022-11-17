function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      // waterfall down
      // returns for both login and register
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
      // console.log(action.id); same
      const newTodo = {
        title: action.title,
        content: action.content,
        author: action.author,
        id: action.id, // dispatch casts _id to id
        dateCreated: action.dateCreated,
        isComplete: action.isComplete,
      };
      console.log(newTodo.id);
      // console.log(newTodo._id); undefined

      return [newTodo, ...state];
      
    case "FETCH_TODOS":
      return action.todos;

    case "CLEAR_POSTS":
      return [];

    case "DELETE_TODO":
      console.log(action.id); // _id undefined
      return state.filter(deleteItem => deleteItem._id !== action.id);

    
      // needs to be fixed, redundent to toggletodoitem
      // fixed and simplified
      case "TOGGLE_TODO":
        return state.map((toToggle) => {
          // console.log(toToggle.id); undefined
          // look for todo with same id
          if (toToggle._id === action.id) {
            console.log(toToggle._id);
            console.log(action.id);
            return {
              // copy and update the new values
              ...toToggle,
              dateCompleted: action.dateCompleted,
              isComplete: action.isComplete,
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