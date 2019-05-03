import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import '../../css/main.css'

class Directory extends Component {

  render() {

    let info = this.props.param; //先取出数据
    const chaptername = this.props.chaptername;

    return (
        <div className="chaptername">
        <NavLink
            to={`/read/${info}/content/${chaptername}`}>
          {chaptername}
        </NavLink>
        </div>
    );
  }
}

export default Directory;
