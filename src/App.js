import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import AuthContainer from "./components/shared/auth/AuthContainer";
import Registration from "./components/pages/Registration/Registration";


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
