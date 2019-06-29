import React, {Component} from 'react';
import ChapterItem from "./ChapterItem";
import ListGroup from "react-bootstrap/ListGroup";

class ChapterList extends Component {


  analyseData() {
    let chapters = this.props.chapters;
    if (chapters === undefined) {
      return []
    }

    chapters = chapters.sort((a, b) => {
      // 从后台传过来的时间，中间带有T
      let time1 = a.createtime.split('T');
      let time2 = b.createtime.split('T');
      let t1 = time1[0] + " " + time1[1];
      let t2 = time2[0] + " " + time2[1];
      //将时间 转为时间戳
      let date1 = new Date(t1);
      let date2 = new Date(t2);
      return date1 - date2;
    });

    return chapters;

  }

  render() {
    return <ListGroup>
      {this.analyseData().map((item, key) => {
        return <ChapterItem chapter={item} key={key} onDeleteChapter={this.props.onDeleteChapter}/>
      })}
    </ListGroup>
  }

}

export default ChapterList;