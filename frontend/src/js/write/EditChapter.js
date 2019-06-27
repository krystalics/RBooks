import React, {Component} from 'react';

import '../../css/main.css'
import Button from "react-bootstrap/Button";
import {Form, InputGroup} from "react-bootstrap";
import {_addChapter, _getChapter, _updateChapter} from '../api'

class EditChapter extends Component {

  constructor(props) {

    super(props);
    this.state = {
      chaptername: localStorage.getItem('editChapterName'),
      content: '',
      readOnly: localStorage.getItem('editChapterName') !== ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentWillMount() {
    this.getData()
  }

  handleChange(event) {
    this.setState({content: event.target.value})
  }


  async getData(){
    if(localStorage.getItem('editChapterName')!==''){
      let chapterid={
        bookid:localStorage.getItem('currentBookId'),
        chaptername:this.state.chaptername
      };
      const res=await _getChapter(chapterid);
      if(res.status===200){
        // console.log(res.data)
        this.setState({content:res.data.content})
      }else{
        alert(res.data)
      }
    }
  }


  async handleSubmit() {
    let chapter = {
      chapterid: {
        bookid: localStorage.getItem('currentBookId'),
        chaptername: this.state.chaptername
      },
      content: this.state.content,

      updatetime: new Date()
    };

    let res='';
    if(localStorage.getItem('editChapterName')===''){
      chapter.createtime=new Date();
      res= await _addChapter(chapter);
    }else{

      res = await _updateChapter(chapter);
    }
    if (res.status === 200) {
      window.history.back(0);
    } else {
      alert(res.data);
    }

  }

  handleNameChange(e) {
    this.setState({chaptername: e.target.value})
  }

  render() {
  // console.log(this.state)
    return (
        <div className="Content">
          <div className="content-left">
          </div>
          <div className="content-middle">
            章节名一旦确定就无法更改:<br/>
            <InputGroup>
              <Form.Control type="text"
                            placeholder="请输入文章标题"
                            onChange={this.handleNameChange}
                            value={this.state.chaptername}
                            readOnly={this.state.readOnly}
                            name="chaptername"/>
              <InputGroup.Append>
                <Button onClick={this.handleSubmit}
                        variant="success">保存</Button>
              </InputGroup.Append>
            </InputGroup>

            <textarea className="Textarea" value={this.state.content}
                      placeholder="writing in ..."
                      onChange={this.handleChange}/>
          </div>
          <div className="content-right">
          </div>
        </div>
    );
  }

}

export default EditChapter;
