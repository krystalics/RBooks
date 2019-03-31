import React, {Component} from 'react';
import Directory from "./Directory";

class ChapterList extends Component {

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

  getChapter(chaptername) {
    let chapter = {};
    for (let item of this.props.contents) {
      console.log(item);
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

  getComments(chaptername) {
    // console.log(JSON.stringify(this.props.comments));  正常显示数据
    let comments = [];
    for (let item of this.props.comments) {
      console.log(item);
      let temp;
      if (item.chaptername === chaptername) {
        temp = {
          bookid: item.bookid,
          chaptername: item.chaptername,
          commentuser: item.commentuser,
          datetime: item.datetime,
          content: item.content
        };
        comments.push(temp);
      }


    }

    return comments;
  }

  render() {

    return (
        <div>
          {this.getNames().map((item, idx) => {
            let content = this.getChapter(item.name);
            let comments = this.getComments(item.name);
            return <Directory key={idx} data={item}
                              chapterid={this.props.chapterid}
                              content={content}
                              comments={comments}
            />
          })}
        </div>

    );
  }
}

export default ChapterList;
