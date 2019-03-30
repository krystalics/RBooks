import React, {Component} from 'react';
import Directory from "./Directory";

class DirectoryList extends Component {

  getNames() {
    let names = [];
    const directory = this.props.data;
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

  //
  getChapter(chaptername) {
    let chapter = {};
    for (let item of this.props.contents) {
      if (item.chaptername === chaptername) {
        chapter = {
          bookid: item.bookid,
          chaptername: item.chaptername,
          author: item.author,
          datetime: item.datetime,
          content: item.content
        }
      }
    }
    return chapter;
  }

  render() {

    return (

        <div>


          {this.getNames().map((item, idx) => {
            let content=this.getChapter(item.name);
            return <Directory key={idx} data={item}
                              chapterid={this.props.chapterid}
                              content={content}
            />
          })}
        </div>

    );
  }
}

export default DirectoryList;
