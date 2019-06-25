import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import '../../css/main.css'
import Button from "react-bootstrap/Button";

class Directory extends Component {

  render() {
    const chaptername = this.props.chaptername;
    let bookname = localStorage.getItem('currentBookName');
    return (
        <div className="chaptername">
          <NavLink to={`/read/${bookname}/${chaptername}`} variant='none'>
            <Button variant='none'
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
