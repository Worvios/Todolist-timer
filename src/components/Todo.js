import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faArrowUp, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'


export const Todo = ({task, deleteTodo, editTodo, toggleComplete, moveUp, moveDown}) => {
 
  return (
    <div className="Todo">
        <FontAwesomeIcon icon={faArrowDown} onClick={() => moveDown(task.id)} />
        <p className={`${task.completed ? 'completed' : ""}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <FontAwesomeIcon icon={faArrowUp} onClick={() => moveUp(task.id)} />
        <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
        </div>
        
        



    </div>
  )
}