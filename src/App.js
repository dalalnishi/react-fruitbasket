import React, {Component} from 'react';
import './App.css';
import { withRouter, Switch } from "react-router-dom";

import Header from './Containers/Header/Header';
import Login from './Containers/Login/Login';
import Userlist from './Containers/Dashboard/Dashboard';
import Adduser from './Containers/Add/Add';
import Cart from './Containers/Cart/Cart';
import Search from './Containers/SearchProduct/SearchResult';
import CRoute from './Containers/Custom-route/Custom-route';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Header></Header>
        {/* Conditional rendering is done via switch i.e it loads first matching route and stops */}
        <main className="main">
          <Switch> 
            <CRoute exact path = '/' component = {Login}/>
            <CRoute exact cprivate path = '/list' component = {Userlist}/>
            <CRoute exact cprivate path = '/add' component = {Adduser}/>
            <CRoute exact path = '/edit/:id' component = {Adduser}/>
            <CRoute exact path = '/register' component = {Login}/>
            <CRoute exact path = '/cart' component = {Cart}/>
            <CRoute exact path = '/search' component = {Search}/>
          </Switch>
        </main>
      </div>
    );
  }  
}

export default withRouter(App);
