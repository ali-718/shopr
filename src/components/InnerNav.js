import React, { Component } from 'react';
import {
    Route, Switch
  } from "react-router-dom";
import Chat from './Chat';
import ListApp from './ListApp';
import Payments from './Payments';
import Settings from './Settings';

class InnerNav extends Component {
    render() {
        return (
            <div class="container">
                <Switch>
                    <Route path="/chat" render={()=><Chat user={this.props.user}/>} />
                    <Route path="/wallet" render={()=><Payments user={this.props.user}/>} />
                    <Route path="/settings" render={()=><Settings user={this.props.user}/>}  />
                    <Route path="/lists" render={()=><ListApp user={this.props.user}/>}/>
                </Switch>
            </div>
        );
    }
}

export default InnerNav;
