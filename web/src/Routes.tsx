import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Home} from "./pages/home";
import {Register} from "./pages/register";
import {Login} from "./pages/login";
import {Bye} from "./pages/bye";
import {Navbar} from "./components/Navbar";

export const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
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