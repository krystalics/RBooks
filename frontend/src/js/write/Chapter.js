import React, {Component} from 'react';

import '../../css/main.css'
import Button from "react-bootstrap/Button";
import axios from 'axios'
import {Form} from "react-bootstrap";

class Chapter extends Component {

  constructor(props) {
    // console.log(props);

    super(props);
    this.state = {
      content: typeof (this.props.location.state.data.content)==="undefined"?"内容":this.props.location.state.data.content,
      chaptername: typeof (this.props.location.state.data.chaptername)==="undefined"?"请输入章节名字":this.props.location.state.data.chaptername
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
        bookid: this.props.location.state.data.bookid,
        chaptername: this.state.chaptername
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
    // console.log(this.props.location.state.data)
    let save = <Button onClick={this.handleSubmit}
                       variant="outline-success">保存</Button>;
    return (
        <div>
          <Form.Control type="text"
                        onChange={this.handleNameChange}
                        value={this.state.chaptername}
                        name="chaptername"/>

          <textarea className="Textarea" value={this.state.content}
                    onChange={this.handleChange}/>

          {save}
        </div>
    );
  }

}

export default Chapter;
