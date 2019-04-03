import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Nav} from 'react-bootstrap'
import '../../css/main.css'
import ReactJSON from 'react-json-view'

class Directory extends Component {

  render() {
    // console.log("Directory" + this.props.param);
    let info=this.props.param; //先取出数据
    const chaptername=this.props.chaptername;
    // let param={
    //   chapterid:{
    //     bookid:JSON.parse(info).bookid,
    //     chaptername:this.props.chaptername
    //   },
    //   author:JSON.parse(info).author
    // };

    // param=JSON.stringify(param); //要字符串才能传进去
    // console.log(param);
    return (
        <div className="Directory">
          <NavLink
              to={`/read/${info}/content/${chaptername}`}>
            {chaptername}
          </NavLink>
        </div>
    );
  }
}

export default Directory;
