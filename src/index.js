import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App.jsx'
import {AuthState} from './context/Auth/AuthState'
import * as serviceWorker from './serviceWorker'

const app = (
    <AuthState>
        <App />
    </AuthState>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
