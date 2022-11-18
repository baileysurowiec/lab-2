import { useContext } from 'react'
import { StateContext } from '../Components/Context'
import Todo from './Todo'

export default function TodoList() {
    const { state } = useContext(StateContext);
    const { todos } = state;
    return (
      <div>
        {/* {todos.map((p) => (
          <Todo {...p} key={p.id}
          />
        ))} */}
        <div>
        {todos.length === 0 && <h2>No To-Do's found.</h2>}
        {todos.length > 0 && todos.map((p) => <Todo {...p} key={p._id} />)}
        </div>
       </div>
    );
  }