import { useContext } from 'react'
import { StateContext } from '../Components/Context'
import Todo from './Todo'

export default function TodoList(){
    const{state} = useContext(StateContext);
    const{todos} = state;
    return(
        <div>
            {todos.map((p, i) => (
        <Todo {...p} key={p.id} />
      ))}
        </div>
    )
}