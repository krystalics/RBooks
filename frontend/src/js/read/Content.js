import React, {Component} from 'react';

import '../../css/main.css'
import MainContent from "./MainContent";
import {Route} from "react-router-dom";

class Content extends Component {

  render() {
    return  <Route path="/read/:bookname/:chaptername"
                   component={MainContent}/>
  }
}

export default Content;
