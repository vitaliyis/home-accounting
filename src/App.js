import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import Login from "./components/pages/Login/Login";
import NotFound from "./components/pages/NotFound/NotFound";
import AuthContainer from "./components/shared/auth/AuthContainer";
import Registration from "./components/pages/Registration/Registration";
import SystemContainer from "./components/shared/system/SystemContainer";
import Bill from "./components/pages/Bill/Bill";
import History from "./components/pages/History/History";
import Planning from "./components/pages/Planning/Planning";
import Records from "./components/pages/Records/Records";
import {getUser} from "./redux/reducers/auth/auth.actions";
import {connect} from "react-redux";


function App() {
  return (
    <div className="">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"/>
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
        <Route path="/system/bill">
          <SystemContainer>
            <Bill/>
          </SystemContainer>
        </Route>
        <Route path="/system/history">
          <SystemContainer>
            <History/>
          </SystemContainer>
        </Route>
        <Route path="/system/planning">
          <SystemContainer>
            <Planning/>
          </SystemContainer>
        </Route>
        <Route path="/system/records">
          <SystemContainer>
            <Records/>
          </SystemContainer>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  }
}

const mapDispatchToProps = {
  getUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
