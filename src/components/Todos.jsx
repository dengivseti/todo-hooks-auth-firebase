import React from 'react'
import {typePriority, doneTodo, filterTodos} from '../utils/utils'

export const Todos = ({todos, onComplete, onRemove}) => {
    todos = filterTodos(todos)
    return (
        <ul className="list-group">
            {todos.map((todo) => (
                    <li 
                        key={todo.id}
                        className="list-group-item"
                    >
                        <div className="row">
                            <div className={`col ${doneTodo(todo.completed)}`} onClick={() => onComplete(todo.id)}>
                                <strong>{todo.title}&nbsp;</strong>
                                <span className={`badge badge-pill badge-${typePriority(todo.priority)}`}>{todo.priority}</span>
                            </div>
                            <div className="col-md-auto">
                                <small>{todo.date}</small>&nbsp;
                            </div>
                            <div className="col col-lg-1">
                                <button type="button" className="close" aria-label="Close" onClick={() => onRemove(todo.id)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </li>

                    
                
            ))}
            
        </ul>
    )
}