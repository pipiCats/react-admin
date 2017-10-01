import React, { Component } from 'react';
import Home from './views/home/Home';
import Login from './views/login/Login';
import NotMatch from './views/404/NotMatch';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="App">
       <Switch>
          <Route exact path="/" render={() => <Redirect to="/app"/>}/>
          <Route path="/app" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route component={NotMatch}/>
       </Switch>
      </div>
    );
  }
}


export default App;
