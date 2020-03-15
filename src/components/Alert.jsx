import React, { useContext } from 'react'
import { AlertContext } from '../context/Alert/alertContext'

export const Alert = () => {
    const {alert, hide} = useContext(AlertContext)
    if (!alert.visible) return null
    return (
        <div className={`alert alert-warning alert-${alert.type}`} role="alert">
        {alert.text}
        <button type="button" className="close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    )
}