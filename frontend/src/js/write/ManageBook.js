import React, {Component} from 'react';
import {_deleteChapter, _getAllChapters} from "../api";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ChapterList from "./ChapterList";

class ManageBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chapters: []
    }
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getAllChapters(localStorage.getItem('currentBookId'));
    // console.log(res.data);// 之前是因为没有权限 和被拦截了
    this.setState({chapters: res.data});
  }

  // 暂时不可用。。
  async handleDeleteChapter(chapterid) {
    // console.log(chapterid)
    let result = window.confirm("确认删除该章节吗？");
    // console.log(result);
    if (result) {
      const res = await _deleteChapter(chapterid);
      if (res.status !== 200) {
        alert(res.data);
      } else {
        let index = this.state.chapters.indexOf(chapterid);
        // console.log(index);
        // console.log(this.state.directory);

        this.state.chapters.splice(index - 1, 1);

        this.setState({chapters: this.state.chapters});
        // console.log(this.state.directory)

      }

    }
  }

  render() {
    // console.log(this.state.chapters)

    return <div className='managebook'>
      <div className="Content">
        <div className='content-left'></div>
        <div className='content-middle'>

          <h5 style={{marginLeft: '40%'}}>{this.props.match.params.chaptername}</h5>
          <hr/>
          <NavLink to={{pathname: '/writing/chapter'}}>
            <Button
                onClick={() => localStorage.setItem('editChapterName', '')}
                variant='link'>
              增加章节
            </Button>
          </NavLink>
          <div className='write-directory'>
            {/*<DirectoryList directory={this.state.directory} write={true}*/}
            {/*/>*/}
            <ChapterList chapters={this.state.chapters} onDeleteChapter={this.handleDeleteChapter.bind(this)}/>
          </div>


        </div>
      </div>
    </div>
  }

}

export default ManageBook;
