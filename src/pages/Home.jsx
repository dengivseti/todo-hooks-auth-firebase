import React, {useContext, useEffect} from 'react'
import { Todos } from '../components/Todos'
import { Form } from '../components/Form'
import { Loader } from '../components/Loader'
import { TodoContext } from '../context/Todo/todoContext'
import { AuthContext } from '../context/Auth/authContext'

export const Home = () => {
    const {todos, loading, fetchTodos, completeTodo, removeTodo} = useContext(TodoContext)
    const {isAuth, autoLogin, user} = useContext(AuthContext)
    useEffect(() => {
        if (isAuth){
            autoLogin()
            fetchTodos(user.userId, user.token) 
        }  
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [])

    return (
        <div className="container">
            <Form />
            <hr/>
            {
                loading
                    ? <Loader />
                    : <Todos todos={todos} onComplete={(id) => completeTodo(user.userId, user.token, id)}  onRemove={(id) => removeTodo(user.userId, user.token, id)}/>
            }          
            
        </div>
    )
}