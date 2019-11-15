import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Settings from './components/Settings';
import Chat from './components/Chat';
import Login from './components/Login';
import ListApp from './components/ListApp';
import Payments from './components/Payments';
import Header from './containers/Header';
import PageFooter from './components/PageFooter'

class App extends Component {
  render() {
    return (
        <div>
            <Header/>
            <Login />
            <PageFooter/>
        </div>
    );
  }
}

export default App;
