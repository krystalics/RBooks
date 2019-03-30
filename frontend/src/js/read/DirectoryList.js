import React, {Component} from 'react';
import Directory from "./Directory";

class DirectoryList extends Component {

  getNames() {
    let names = [];
    const directory=this.props.data;
    // alert(directory); //这里出现 undefined
    for (let index in directory) {
      let temp;
      temp = {
        name: directory[index].name
      };
      names.push(temp);
    }
    return names;
  }

  render() {
    return (
        this.getNames().map((item, idx) => {
          return <Directory key={idx} data={item} chapterid={this.props.chapterid}/>
        })
    );
  }
}

export default DirectoryList;
