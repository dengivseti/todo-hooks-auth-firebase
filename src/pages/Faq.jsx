import React from 'react'


export const Faq  = () => {


    return (
        <div className="jumbotron">
        <div className="container">
            <h1 className="display-5">FAQ</h1>
             <p>“All tasks are evaluated using the criteria important/unimportant and urgent/not urgent and put in according quadrants. Tasks in unimportant/not urgent are dropped, tasks in important/urgent are done immediately and personally, tasks in unimportant/urgent are delegated and tasks in important/not urgent get an end date and are done personally. This method is said to have been used by US President Dwight D. Eisenhower, and is outlined in a quote attributed to him: What is important is seldom urgent and what is urgent is seldom important.”</p>
             <p><strong>IU</strong> - Important Urgent</p>
             <p><strong>NU</strong> - Non Important Urgent</p>
             <p><strong>IN</strong> - Important NonUrgent</p>
             <p><strong>NN</strong> - NonImportant NonUrgent</p>
            <p>Version application: <strong>1.0.0</strong></p>
        </div>
        </div>
    )
}