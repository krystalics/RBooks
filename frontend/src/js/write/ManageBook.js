import React, {Component} from 'react';
import {_deleteChapter, _getDirectory} from "../api";
import {NavLink} from "react-router-dom";
import DirectoryList from "../read/DirectoryList";
import Button from "react-bootstrap/Button";

class ManageBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      directory: ''
    }
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getDirectory(localStorage.getItem('currentBookId'));
    // console.log(res.data); 之前是因为没有权限 和被拦截了
    this.setState({directory: res.data});
  }

  async handleDeleteChapter(chapterid) {
    // console.log(chapterid)
    let result = window.confirm("确认删除该章节吗？");
    // console.log(result);
    if (result) {
      const res = await _deleteChapter(chapterid);
      if (res.status !== 200) {
        alert(res.data);
      } else {
        let index = this.state.directory.indexOf(chapterid.chaptername);
        // console.log(index);
        // console.log(this.state.directory);

        this.state.directory.splice(index - 1, 1);

        this.setState({directory: this.state.directory});
        // console.log(this.state.directory)

      }

    }
  }

  render() {
    // console.log(this.state.directory);
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
            <DirectoryList directory={this.state.directory} write={true}
                           onDeleteChapter={this.handleDeleteChapter.bind(this)}/>
          </div>
        </div>
      </div>
    </div>
  }

}

export default ManageBook;
