import {AUTH_SUCCESS, AUTH_LOGOUT} from '../types'

const handlers = {
    [AUTH_SUCCESS]: (state, {payload}) => ({...state, isAuth: true, user: payload}),
    [AUTH_LOGOUT]: (state) => ({...state, isAuth: false, user: null}),
    DEFAULT: state => state
}

export const authReducer = (state, action) =>{
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}