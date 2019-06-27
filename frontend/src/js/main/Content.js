import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "../home/Home";
import Write from "../write/Write";
import Message from "../message/Message";
import MyPage from "../mypage/MyPage";
import Login from "../login/Login";
import Settings from "../settings/Settings";
import Read from "../read/Read";
import '../../App.css'
import EditChapter from "../write/EditChapter";

class Content extends Component {
  render() {
    return (
        <div>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/write" component={Write}/>
            <Route path="/message" component={Message}/>
            <Route path="/mypage" component={MyPage}/>
            <Route path="/user/login" component={Login}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/read" component={Read}/>
            <Route path="/writing/chapter" component={EditChapter}/>

          </Switch>
        </div>
    );
  }
}

export default Content;
