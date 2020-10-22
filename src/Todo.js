import React from 'react'
//checkbox
export default function Todo({ todo, parentChangeHandler }) {
  return (
    <div>
      <label>
        <input id={todo.id} checked={todo.complete} type="checkbox" onChange={parentChangeHandler} />
        {todo.name}
      </label>

    </div>
  )
}