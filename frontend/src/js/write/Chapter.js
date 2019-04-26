import React, {Component} from 'react';

import '../../css/main.css'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import {Form} from "react-bootstrap";

class Chapter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content,
      chaptername: this.props.chapterid.chaptername
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value})
  }

  handleSubmit() {
    let chapter = {
      chapterid: {
        bookid:this.props.chapterid.bookid,
        chaptername:this.state.chaptername
      },
      content: this.state.content,
      datetime: new Date()
    };

    axios.post("http://localhost:8080/write/updatechapter", chapter) //新建的章节也可以是这样
    .then(res => {
      alert(res.data);
      //这里需要重定向到之前的页面
      window.history.back(0);
    })
    .catch(err => {
      alert(err.data)
    });
  }

  handleNameChange(e) {
    this.setState({chaptername: e.target.value})
  }

  render() {
    let save = <Button onClick={this.handleSubmit} action
                       variant="outline-success">保存</Button>;
    return (
        <div>
          <Form.Control type="text"
                        onChange={this.handleNameChange}
                        value={this.state.chaptername}
                        name="chaptername"/>

          <textarea className="textarea" value={this.state.content}
                    onChange={this.handleChange}/>

          {save}
        </div>
    );
  }

}

export default Chapter;
