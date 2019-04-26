import React, {Component} from 'react';
import Directory from "./Directory";
import {Button, Nav} from 'react-bootstrap'
import '../../css/main.css'

class DirectoryList extends Component {

  // getChapter(chaptername) {
  //   let chapter = {};
  //   for (let item of this.props.contents) {
  //     console.log(item);
  //     if (item.chaptername === chaptername) {
  //       chapter = {
  //         bookid: item.bookid,
  //         chaptername: item.chaptername,
  //         author: item.author,
  //         datetime: item.datetime,
  //         content: item.content
  //       }
  //     }
  //   }
  //   return chapter;
  // }

  // getComments(chaptername) {
  //   // console.log(JSON.stringify(this.props.comments));  正常显示数据
  //
  //   let comments = [];
  //   for (let item of this.props.comments) {
  //     // console.log(item);
  //
  //     let temp;
  //     if (item.chapterid.chaptername === chaptername) {
  //       temp = {
  //         chapterid: {
  //           bookid: item.chapterid.bookid,
  //           chaptername: item.chapterid.chaptername
  //         },
  //         commentuser: item.commentuser,
  //         datetime: item.datetime,
  //         content: item.content
  //       };
  //       comments.push(temp);
  //
  //     }
  //
  //   }
  //
  //   return comments;
  // }

  getNames() {
    const directory = this.props.directory;
    let names = [];
    for (let item of directory) {
      names.push(item);
    }
    return names;

  }

  handleDelete(){

  }

  render() {
    // console.log(this.props.param) 有数据
    return (
        <div className="sidebar_left">
          <div className="sidebar_left_span">目录</div>
          <Nav className="flex-column">
            {this.getNames().map((item, idx) => {

              // let content = this.getChapter(item.name);
              // let comments = this.getComments(item.name);
              return <Directory key={idx} chaptername={item}
                                param={this.props.param}/>
            })}


            <Nav.Link href="/write/chapter"><Button variant="success">增加章节</Button></Nav.Link>
            <Button variant="danger" onClick={()=>{}}>删除章节</Button>

          </Nav>

        </div>

    );
  }
}

export default DirectoryList;
