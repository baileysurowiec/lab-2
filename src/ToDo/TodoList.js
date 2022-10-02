import Todo from './Todo'

export default function TodoList({todos = []}){
    return(
        <div>
            {todos.map((p,i) => <Todo {...p} key = {'todos-' + i}/>)}
        </div>
    )
}