import React, { useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../context/Auth/authContext'

export const Navbar = () => {
    const {isAuth, logout} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="navbar-brand">
                ToDo App
            </div>
            <ul className="navbar-nav ">
                {isAuth 
                    ? (
                    <React.Fragment>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" exact>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/faq">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout" onClick={() => logout()}>Logout</NavLink>
                        </li>
                    </React.Fragment>
                    )
                    :   (<li className="nav-item">
                        <NavLink className="nav-link" to="/">Login</NavLink>
                    </li>)
                }
                
              
            </ul>
        </nav>
    )
}