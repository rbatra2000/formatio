import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import Forgot from './screens/ForgotScreen';
import FormationScreen from './screens/FormationsScreen';
import SpreadsheetScreen from './screens/SpreadsheetScreen';
import Store from "./constants/global";
import Unauthorized from "./screens/UnauthorizedScreen";
import { AuthProvider } from "./constants/Auth";
import PrivateRoute from "./constants/PrivateRoute";
import Demo from './components/Drawer';
import DashboardScreen from "./screens/DashboardScreen";
import CreateTeamScreen from "./screens/CreateTeamScreen";
import TeamHomeScreen from "./screens/TeamHomePage";
import LandingScreen from "./screens/LandingScreen";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Store>
          {/* <nav style={{ backgroundColor: 'lightgray' }}>
          <ul>
          <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/formations">Formations</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/spreadsheet">Spreadsheet</Link>
            </li>
          </ul>
        </nav> */}

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/spreadsheet" component={SpreadsheetScreen} />
            <PrivateRoute exact path="/formations" component={FormationScreen} />
            <PrivateRoute exact path="/create" component={CreateTeamScreen} />
            <Route exact path='/unauthorized' component={Unauthorized} />
            <Route exact path='/forgot' component={Forgot} />
            <PrivateRoute exact path='/drawer' component={Demo} />
            <PrivateRoute path="/team" component={TeamHomeScreen} />
            <Route path="/login" component={Login} />
            <Route path="/" component={LandingScreen} />

            <PrivateRoute path="/dashboard" component={DashboardScreen} />
          </Switch>
        </Store>
      </Router>
    </AuthProvider>
  );
}


// ReactDOM.render(<App />, document.querySelector('#app'));


// import React from 'react';
// import logo from './logo.svg';
// import './App.css';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }