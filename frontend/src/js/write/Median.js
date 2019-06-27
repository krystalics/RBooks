import React,{Component} from 'react';
import {Route} from "react-router-dom";
import ManageBook from "./ManageBook";

class Median extends Component{


  render() {
    return <Route path="/write/:chaptername"
                  component={ManageBook}/>
  }

}

export default Median;
