import React, {Component} from 'react';

import '../../css/main.css'
import MainContent from "./MainContent";
import {Route} from "react-router-dom";

class Content extends Component {

  render() {
    // console.log("Directory" + this.props.param);
    // console.log(this.props.data);
    let item = '';
    if (typeof (this.props.data)=== 'undefined') {
      item = <Route path="/read/:param/content/:chaptername"
                    component={MainContent}/>
    } else {
      item = <div>
        书本简介：
        <hr/>
        {this.props.data.des.description}
      </div>
    }
    return (
        item
    );
  }
}

export default Content;
