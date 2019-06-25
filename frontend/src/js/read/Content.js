import React, {Component} from 'react';

import '../../css/main.css'
import MainContent from "./MainContent";
import {NavLink, Route} from "react-router-dom";
import Button from "react-bootstrap/Button";

class Content extends Component {

  render() {

    let item = '';
    let data={
      bookid:this.props.bookid,
      content:'',
      chaptername:''
    };
    let add=undefined;
    if(this.props.author === localStorage.getItem("name")){
      add=<NavLink to={{
        pathname: '/writing/chapter',
        state: {data}
      }}><Button variant="outline-success">
        增加章节</Button>
      </NavLink>
    }

      item = <Route path="/read/:bookname/:chaptername"
                    component={MainContent}/>
    // } else {
    //   item = <div>
    //     {add}
    //     <br/>
    //     书本简介：
    //     <hr/>
    //     {localStorage.getItem("currentBookDes")}
    //   </div>
    // }
    return (
        item
    );
  }
}

export default Content;
