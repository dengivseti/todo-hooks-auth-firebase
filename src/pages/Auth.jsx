import React, { useState, useContext} from 'react'
import {AuthContext} from '../context/Auth/authContext'
import {validateEmail} from '../utils/utils'
import { AlertContext } from '../context/Alert/alertContext'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const alert = useContext(AlertContext)

    const {authFirebase} = useContext(AuthContext)

    const validationForm = (email, password) => {
        if (!email.trim()) {
            alert.show('Введите email', 'danger')
        }
        if (!validateEmail(email)) {
            alert.show('Введите корректный email', 'danger')
            return false
        }
        if (!password.trim()) {
            alert.show('Введите пароль', 'danger')
            return false
        }
        if (!(password.trim().length > 5)) {
            alert.show('Пароль должен быть больше 5 символов', 'danger')
            return false
        }
        return true
    }

    const auth = (event, isRegistation) => {
        event.preventDefault()
        if (!validationForm(email, password)){
            return
        }
        authFirebase(email, password, isRegistation)
            .then(() => {
                if (isRegistation){
                    alert.show('Вы успешно зарегистрировались', 'success')
                }else{
                    alert.show('Вы успешно авторизовались', 'success')
                }
                // setEmail('')
                // setPassword('')
                
            })
            .catch((e) =>{
                alert.show(e.message, 'danger')
            })
    }
    
    return (
        <div className="row row-cols-md-3 justify-content-center">
            <form className="form-signin">
                <div className="form-label-group mt-3">
                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </div>
                <div className="form-label-group mt-3">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required minLength="5"/> 
                </div>
                <div className="btn-group btn-block mt-3" role="group">
                <button type="button" className="btn btn-success" onClick={e => auth(e, false)}>Auth</button>
                <button type="button" className="btn btn-info" onClick={e => auth(e, true)}>Registration</button>
                </div>
        </form>
        </div>
    )
}