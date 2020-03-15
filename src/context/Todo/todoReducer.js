import { SHOW_LOADER, FETCH_TODOS, ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from "../types"

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [FETCH_TODOS]: (state, {payload}) => ({...state, loading: false, todos: payload}),
    [ADD_TODO]: (state, {payload}) => ({...state, todos: [...state.todos, payload]}),
    [COMPLETE_TODO]: (state, {payload}) => ({
        ...state, 
        todos: [...payload]
    }),
    [REMOVE_TODO]: (state, {payload}) => ({
        ...state, 
        todos: state.todos.filter(todo => todo.id !== payload)
    }),
    DEFAULT: state=> state
}

export const todoReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}