import React, {Component} from 'react';
import DirectoryItem from "./DirectoryItem";
import '../../css/main.css'

class DirectoryList extends Component {

  getNames() {
    const directory = this.props.directory;
    let names = [];
    for (let item of directory) {
      names.push(item);
    }

    names.sort();
    names=names.map(item=>{
      return item.split("~")[1];
    });

    return names;

  }

  render() {

    return (
        this.getNames().map((item, idx) => {
          return <DirectoryItem key={idx} chaptername={item} write={this.props.write} onDeleteChapter={this.props.onDeleteChapter}/>
        })
    );
  }
}

export default DirectoryList;
