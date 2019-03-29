import React, {Component} from 'react';
import '../../css/main.css'
import '../../App.css'

import {Route, Switch, HashRouter} from "react-router-dom";

import Home from "../home/Home";
import Write from "../write/Write";
import Message from "../message/Message";
import Mypage from "../mypage/Mypage";
import Login from "../login/Login";
import Settings from "../settings/Settings";
import Read from "../read/Read";

class Container extends Component {
  render() {
    return (
        <div className="Container">

            <Switch>
              <Route path="/home" exact component={Home}/>
              <Route path="/write" component={Write}/>
              <Route path="/message" component={Message}/>
              <Route path="/mypage" component={Mypage}/>
              <Route path="/user/login" component={Login}/>
              <Route path="/settings" component={Settings}/>
              <Route path="/read/:data" component={Read}/>
            </Switch>

        </div>
    );
  }
}

export default Container;
