import React, {Component} from 'react';
import Directory from "./Directory";
import {Nav} from 'react-bootstrap'
import '../../css/main.css'

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

    return (
        <div className="sidebar_left">
          <div className="sidebar_left_span">目录</div>
          <Nav className="flex-column">
            {this.getNames().map((item, idx) => {
              return <Directory key={idx} chaptername={item}
                                param={this.props.param}/>
            })}
          </Nav>

        </div>

    );
  }
}

export default DirectoryList;
