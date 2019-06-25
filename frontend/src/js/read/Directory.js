import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import '../../css/main.css'
import Button from "react-bootstrap/Button";

class Directory extends Component {

  render() {

    let info = this.props.param; //先取出数据
    const chaptername = this.props.chaptername;
    let bookname = localStorage.getItem('currentBookName');
    return (
        <div className="chaptername">
          <NavLink to={`/read/${bookname}/${chaptername}`}>
            <Button variant='link'
                    onClick={() => localStorage.setItem('currentBookChapter',
                        chaptername)}>
              {chaptername}
            </Button>
          </NavLink>
        </div>
    );
  }
}

export default Directory;
