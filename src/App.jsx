import React, { useContext, useEffect } from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {Home} from './pages/Home'
import {Faq} from './pages/Faq'
import {Auth} from './pages/Auth'
import { Navbar } from './components/Navbar'
import { Alert } from './components/Alert'
import { AlertState } from './context/Alert/AlertState'
import { TodoState } from './context/Todo/TodoState'
import {AuthContext} from './context/Auth/authContext'


function App() {
  const {isAuth, autoLogin} = useContext(AuthContext)
  useEffect(() => {
    autoLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  let route = null
  if (isAuth) {
    route = (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/faq" component={Faq} />
        <Redirect to="/"/>
      </Switch>
    )
  }else{
    route = (
      <Switch>
        <Route path="/" component={Auth} />
      </Switch> 
    )
  }

  return (
      <TodoState>
        <AlertState>
          <BrowserRouter>
            <Navbar />
            <div className="container pt-4">
              <Alert />
              {route}
            </div>
          </BrowserRouter>
        </AlertState>
      </TodoState>
  );
}

export default App
