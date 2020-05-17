import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import NavBar from './navbar';
import Duel from './duel';
import Rankings from './rankings';

const App = (props) => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Duel} />
        <Route exact path="/rankings" component={Rankings} />
        <Route render={() => (<div>Page not found!</div>)} />
      </Switch>
    </Router>
  );
};

export default App;
