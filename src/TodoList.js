import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, grandParentChangeHandler }) {
    return (
        // maps todos and returns todo name
        todos.map(todo => {
            return <Todo key={todo.id} todo={todo} parentChangeHandler={grandParentChangeHandler} />
        })
    )
}
