import React, {Component} from 'react';
import {ListGroupItem, Button} from "react-bootstrap";

import {NavLink} from "react-router-dom";

class ChapterItem extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit() {
    localStorage.setItem('editChapterName',
        this.props.chapter.chapterid.chaptername);
  }

  handleDelete() {
    this.props.onDeleteChapter(this.props.chapter.chapterid);
  }

  render() {
    const chapter = this.props.chapter;
    // console.log(chapter)
    let path = {
      pathname: `/read/${localStorage.getItem('currentBookName')}/${chapter.chapterid.chaptername}`,
      // state: {content:chapter.content,} //要将content包装成对象，传进state
    };
    return (
        <ListGroupItem>
          <NavLink to={path}>
            <Button variant='link'
                    onClick={() => {
                      localStorage.setItem('currentBookChapter',
                        chapter.chapterid.chaptername)}
                    }>
              {chapter.chapterid.chaptername}

            </Button>
          </NavLink>
          点赞数: {chapter.love}

          <div style={{position:'absolute',display:'inline',right:'5px'}}>
            <NavLink to={{pathname: '/writing/chapter'}}
                     style={{marginLeft: '20px'}}>
              <Button onClick={this.handleEdit} variant='none'>
                编辑
              </Button>
            </NavLink>

            <Button onClick={this.handleDelete} variant='none'>删除</Button>
          </div>
          <br/>

          <span>创建: {chapter.createtime.split('T')[0]}</span>
          <span style={{marginLeft: '20px'}}>更新: {chapter.updatetime.split(
              "T")[0]}</span>
        </ListGroupItem>
    );
  }

}

export default ChapterItem;