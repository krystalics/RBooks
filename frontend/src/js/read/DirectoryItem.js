import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import '../../css/main.css'
import Button from "react-bootstrap/Button";

class DirectoryItem extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete() {
    let chapterid = {
      bookid: localStorage.getItem('currentBookId'),
      chaptername: this.props.chaptername
    };
    this.props.onDeleteChapter(chapterid);
  }

  delOrnot(chaptername, write) {
    if (chaptername === '序言') {
      return ''
    } else if(write===true){
      return <Button onClick={this.handleDelete} variant='none'>删除</Button>;
    }
  }

  handleEdit() {
    localStorage.setItem('editChapterName', this.props.chaptername);
  }

  render() {
    const chaptername = this.props.chaptername;
    let bookname = localStorage.getItem('currentBookName');
    let edit = '';

    if (typeof (this.props.write) !== 'undefined') {
      edit = <NavLink to={{pathname: '/writing/chapter'}} style={{marginLeft:'100px'}}>
        <Button onClick={this.handleEdit} variant='none'>
          编辑
        </Button>
      </NavLink>

    }
    return (
        <div className="chaptername">
          <NavLink to={`/read/${bookname}/${chaptername}`}>
            <Button variant='link'
                    onClick={() => localStorage.setItem('currentBookChapter',
                        chaptername)}>
              {chaptername}
            </Button>
          </NavLink>
          {edit}
          {this.delOrnot(chaptername, this.props.write)}
        </div>
    );
  }
}

export default DirectoryItem;
