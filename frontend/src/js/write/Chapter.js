import React, {Component} from 'react';

import '../../css/main.css'
import Button from "react-bootstrap/Button";
import {Form, InputGroup} from "react-bootstrap";
import {_updateChapter} from '../api'

class Chapter extends Component {

  constructor(props) {

    super(props);
    this.state = {
      content: typeof (this.props.location.state.data.content)==="undefined"?"":this.props.location.state.data.content,
      chaptername: typeof (this.props.location.state.data.chaptername)==="undefined"?"":this.props.location.state.data.chaptername,
      oldName: typeof (this.props.location.state.data.chaptername)==="undefined"?"":this.props.location.state.data.chaptername
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value})
  }

  async handleSubmit() {
    let chapter = {
      chapterid: {
        bookid: this.props.location.state.data.bookid,
        chaptername: this.state.chaptername
      },
      content: this.state.content,
      datetime: new Date()
    };


    const res=await _updateChapter(this.state.oldName,chapter);
    if(res.status===200){
      if(this.state.oldName===this.state.chaptername)
        window.history.back(0);
      else {
        window.history.back(-2); //更新名字了之后，之前的页面路径发送变化，获取不到后台数据，所以往回退两个页面
      }
    }else{
      alert(res.data);
    }

  }

  handleNameChange(e) {
    this.setState({chaptername: e.target.value})
  }

  render() {

    return (
        <div>
          <InputGroup>
          <Form.Control type="text"
                        placeholder="请输入文章标题"
                        onChange={this.handleNameChange}
                        value={this.state.chaptername}
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
    );
  }

}

export default Chapter;
