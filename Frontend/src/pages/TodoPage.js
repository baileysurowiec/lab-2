import React, { useEffect } from 'react'
import { useResource } from 'react-request-hook';
import { useParams } from "react-router-dom";

export default function TodoPage () {
    const { id } = useParams();

    const [ todo, getTodo ] = useResource(() => ({
        url: `/todos/${id}`,
        method: 'get'
    }))
    useEffect(getTodo, [id])

    return (
        <div>
            {(todo && todo.data)
                ? <Todo {...todo.data} />
                : 'Loading...'
            }
            <hr />
        </div>
    )
}
