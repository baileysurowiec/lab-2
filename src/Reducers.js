
    function userReducer(state, action){
        switch(action.type){
          case "LOGIN":
          case "REGISTER":
            return action.username;
          case "LOGOUT":
            return "";
          default:
            return state;
        }
      }
      function todoReducer(state, action){
        switch(action.type){
            case "CREATE_TODO":
                const newTodo = {
                    title: action.title,
                    content: action.content,
                    author: action.author,
                    id: action.id
                };
                return[newTodo,...state];
            // case "TOGGLE_TODO":
            // case "DELETE_TODO":
            
            default:
                return state;
        }
      }

      export default function appReducer(state, action){
        return{
            user: userReducer(state.user, action),
            post: todoReducer(state.todos, action),
        }
      }