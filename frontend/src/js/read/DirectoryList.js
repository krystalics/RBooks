import React, {Component} from 'react';
import Directory from "./Directory";
import {Button, Nav} from 'react-bootstrap'
import '../../css/main.css'
import {NavLink} from 'react-router-dom'

class DirectoryList extends Component {

  getNames() {
    const directory = this.props.directory;
    let names = [];
    for (let item of directory) {
      names.push(item);
    }
    return names;

  }


  render() {

    let data = {
      bookid: this.props.bookid
    };
    let item;
    if (this.props.author === localStorage.getItem("name")) {
      item = <NavLink to={{
        pathname: '/writing/chapter',
        state: {data}
      }}>
        <Button variant="outline-success">增加章节</Button>
      </NavLink>
    } else {
      item = undefined;
    }
    return (
        <div className="sidebar_left">
          <div className="sidebar_left_span">目录</div>
          <Nav className="flex-column">
            {this.getNames().map((item, idx) => {
              return <Directory key={idx} chaptername={item}
                                param={this.props.param}/>
            })}

            {item}
          </Nav>

        </div>

    );
  }
}

export default DirectoryList;
