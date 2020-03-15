export const typePriority = type => {
    switch (type.toString()) {
        case 'IU':
            return 'danger'
        case 'NU':
            return 'warning'
        case 'IN':
            return 'primary'
        default:
            return 'info'
    }
}

export const doneTodo = completed => (completed) ? 'done' : ''

export const filterTodos = (todos) => {
    const IU = todos.filter(todo => todo.priority === 'IU') || []
    const NU = todos.filter(todo => todo.priority === 'NU') || []
    const IN = todos.filter(todo => todo.priority === 'IN') || []
    const NN = todos.filter(todo => todo.priority === 'NN') || []
    const TODOS = [...IU, ...NU, ...IN, ...NN]
    return TODOS
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase())
}

