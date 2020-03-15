import React, { useReducer } from 'react'
import axios from 'axios'
import { TodoContext } from "./todoContext"
import { todoReducer } from './todoReducer'
import { SHOW_LOADER, ADD_TODO, REMOVE_TODO, FETCH_TODOS, COMPLETE_TODO } from '../types'


export const TodoState = ({children}) =>{
    const initialState = {
        loading: true,
        todos: [],
    }
    const url = process.env.REACT_APP_BD_URL

    const [state, dispatch] = useReducer(todoReducer, initialState)
    const fetchTodos = async (userId, token) => {
        try {
            showLoader()
            const res = await axios.get(`${url}/todos/${userId}/todo.json?auth=${token}`)
            if (!res.data) res.data = []
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })
            dispatch({ type: FETCH_TODOS, payload})
        } catch (e) {
            console.log(e.response.data.error)
        }
    }

    const addTodo = async (title, priority, userId, token) => {
        const todo = {
            title, priority,
            date: new Date().toJSON(),
            completed: false
        }
        try {
            const res = await axios.post(`${url}/todos/${userId}/todo.json?auth=${token}`, todo)
            const payload = {
                ...todo,
                id: res.data.name
            }
            dispatch({ type: ADD_TODO, payload})
        } catch (e) {
            console.log(e.response.data.error)
            throw new Error(e.response.data.error)
        }
        
    }

    const completeTodo = async (userId, token, id) => {
        const todos = state.todos
        const todo = todos.find(todo => todo.id === id)
        await axios.patch(`${url}/todos/${userId}/todo/${id}.json?auth=${token}`, {completed: !todo.completed})
        todo.completed = !todo.completed
        dispatch({ type: COMPLETE_TODO, payload: todos })
    }

    const removeTodo = async (userId, token, id) => {
        await axios.delete(`${url}/todos/${userId}/todo/${id}.json?auth=${token}`)
        dispatch({ type: REMOVE_TODO, payload: id })
    }

    const showLoader = () => dispatch({type: SHOW_LOADER})

    return (
        <TodoContext.Provider value={{
            fetchTodos, addTodo, removeTodo, showLoader, completeTodo,
            todos: state.todos,
            loading: state.loading
        }}>
            {children}
        </TodoContext.Provider>
    )
}