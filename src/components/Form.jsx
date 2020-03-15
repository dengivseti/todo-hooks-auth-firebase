import React, {useState, useContext} from 'react'
import {AlertContext} from '../context/Alert/alertContext'
import {TodoContext} from '../context/Todo/todoContext'
import {AuthContext} from '../context/Auth/authContext'

export const Form = () => {
    const [value, setValue] = useState('')
    const [type, setType] = useState('IU')
    const alert = useContext(AlertContext)
    const {addTodo} = useContext(TodoContext)
    const {user} = useContext(AuthContext)
    

    const submitHandler = async event => {
        try {
            event.preventDefault()
            if (!value.trim()) {
                alert.show('Enter the data', 'danger')
                return
            }
            if (value.trim().length < 3)
            alert.show('Minimum number of characters in task 3', 'danger')
            await addTodo(value, type, user.userId, user.token)
            alert.show('Task successfully created', 'success')
            setValue('')
        } catch (error) {
            alert.show(error.message, 'danger')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-row align-items-center">
            <div className="col col-lg-10-sm-1">
                <input 
                    className="form-control"
                    type="text"
                    value={value}
                    placeholder="Input task"
                    onChange={event => setValue(event.target.value)}
                />
            </div>
            <div className="col-auto">
                <select className="form-control" onChange={event => setType(event.target.value)} value={type}>
                    <option>IU</option>
                    <option>NU</option>
                    <option>IN</option>
                    <option>NN</option>
                </select>
            </div>
            </div>
        </form>
    )
}