import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Login from "./components/auth/login/Login";
import Registration from "./components/auth/registration/Registration";
import NotFound from "./components/NotFound";
import AuthContainer from "./components/auth/AuthContainer";

function App() {
  return (
    <div className="">
      <Switch>
        <Route path="/" exact>
          <AuthContainer>
            <Login/>
          </AuthContainer>
        </Route>
        <Route path="/login">
          <AuthContainer>
            <Login/>
          </AuthContainer>
        </Route>
        <Route path="/registration">
          <AuthContainer>
            <Registration/>
          </AuthContainer>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
