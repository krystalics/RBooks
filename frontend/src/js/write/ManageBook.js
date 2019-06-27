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

  async handleDeleteChapter(chapterid){
    // console.log(chapterid)
    let result=window.confirm("确认删除该章节吗？");
    if(result){
      const res=await _deleteChapter(chapterid);
      if(res.status!==200){
        alert(res.data);
      }
    }
  }

  render() {
    // console.log(this.state.directory);
    return <div className='managebook'>
      <span>{this.props.match.params.chaptername}</span>
      <NavLink to={{pathname:'/writing/chapter'}}>
        <Button onClick={()=>localStorage.setItem('editChapterName','')} variant='link'>
          增加章节
        </Button>
      </NavLink>

      <hr/>

      <DirectoryList directory={this.state.directory} write={true} onDeleteChapter={this.handleDeleteChapter.bind(this)}/>

    </div>
  }

}

export default ManageBook;
