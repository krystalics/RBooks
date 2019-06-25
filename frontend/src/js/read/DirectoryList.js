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

    return (

          <Nav className="flex-column">
            {this.getNames().map((item, idx) => {
              return <Directory key={idx} chaptername={item}/>
            })}
          </Nav>

    );
  }
}

export default DirectoryList;
