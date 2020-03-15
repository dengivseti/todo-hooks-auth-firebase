import React, { useReducer } from 'react'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'
import {AUTH_SUCCESS, AUTH_LOGOUT} from '../types'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

export const AuthState = ({children}) => {

    const initialState = {
        isAuth: false,
        user: null,
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const authFirebase = async (email, password, isRegistration) => {
        const authData = {
            email, password,
            returnSecureToken: true
        }
        try {
            let res = null
            if (isRegistration){
                res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, authData)
            }else{
                res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, authData)
            }
            const data = res.data
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            const user = {
                token: data.idToken,
                userId: data.localId,
                expirationDate: expirationDate
            }
            dispatch({ type: AUTH_SUCCESS, payload: user})
        } catch (e) {
            throw new Error(e.response.data.error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expirationDate')
        dispatch({ type: AUTH_LOGOUT})
    }

    const autoLogin = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch({ type: AUTH_LOGOUT})
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                logout()
            } else{
                const userId = localStorage.getItem('userId')
                const user = {
                    token, userId, expirationDate
                }
                dispatch({ type: AUTH_SUCCESS, payload: user})
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            authFirebase, logout, autoLogin,
            isAuth: state.isAuth,
            user: state.user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}