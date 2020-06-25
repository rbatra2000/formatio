import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './screens/LoginScreen';
import Register from './screens/RegisterScreen';
import FormationScreen from './screens/FormationsScreen';
import Store from "./constants/global";

export default function App() {
  return (
    <Router>
      <Store>
        <nav style={{ backgroundColor: 'lightgray' }}>
          <ul>
            <li>
              <Link to="/drag">Formations</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/drag">
            <FormationScreen />
          </Route>
          <Route path="/">
            <Login />
          </Route>

        </Switch>
      </Store>
    </Router>
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