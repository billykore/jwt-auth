import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {Home} from "./pages/home";
import {Register} from "./pages/register";
import {Login} from "./pages/login";
import {Bye} from "./pages/bye";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <ul>
            <li>
              <Link to='/'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/register'>
                Register
              </Link>
            </li>
            <li>
              <Link to='/login'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/bye'>
                Bye
              </Link>
            </li>
          </ul>
        </header>

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/bye' component={Bye} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes
