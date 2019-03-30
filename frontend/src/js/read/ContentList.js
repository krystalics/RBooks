import React, {Component} from 'react';
import MainContent from "./MainContent";

class ContentList extends Component {

  getContents() {
    let contents = [];
    const data=this.props.data;
    // alert(directory); //这里出现 undefined
    for (let index in data) {
      let temp;
      temp = {
        bookid:data[index].bookid,
        chaptername: data[index].chaptername,
        author:data[index].author,
        datetime:data[index].datetime,
        content:data[index].content
      };
      contents.push(temp);
    }
    return contents;
  }

  render() {
    return (
        this.getContents().map((item, idx) => {
          return <MainContent key={idx} data={item}/>
        })
    );
  }
}

export default ContentList;
