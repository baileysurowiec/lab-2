// import React, { useEffect, useContext } from 'react'
// import { useResource } from 'react-request-hook';
// import { useParams, useNavigate } from "react-router-dom";
// import { StateContext } from '../Components/Context';
// import Todo from '../ToDo/Todo';

// export default function TodoPage() {
//   const { id } = useParams();
//   const { state, dispatch } = useContext(StateContext);

//   const navigate = useNavigate();

//   const [todo, getTodo] = useResource(() => ({
//     url: `/todo/${id}`,
//     method: "get",
//     headers: { Authorization: `${state.user.access_token}` },
//   }));
//   useEffect(getTodo, [id]);

//   useEffect(() => {
//     navigate(`/todo/${todo.data._id}`);
//   }, [todo]);

//   return (
//     <div>
//       {todo && todo.data ? <Todo {...todo.data} /> : "Loading..."}
//       <hr />
//     </div>
//   );
// }
