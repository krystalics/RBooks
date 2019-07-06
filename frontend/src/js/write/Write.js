import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../../css/main.css'
import BookList from "../book/BookList";
import {_addBook, _deleteBook, _getWrite} from '../api'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import ManageBook from "./ManageBook";
import {Route} from "react-router-dom";

class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      description: '',
      booklist: '',
      label: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  async getData() {
    const res = await _getWrite(localStorage.getItem('name'));
    if (res.status === 200) {
      this.setState({booklist: res.data})
    } else {
      alert(res.data);
    }
  }

  handleNameChange(e) {
    if (e.target.value.length > 15) {
      return
    }
    this.setState({bookname: e.target.value})
  }

  handleDesChange(e) {
    this.setState({description: e.target.value})
  }

  handleLabelChange(e) {

    this.setState({label: e.target.value})
  }

  async handleSubmit() {
    // id photourl love  都不填
    if (this.state.label === "" || this.state.label === "...") {
      alert("请选择一个标签");
      return
    }
    if(this.state.bookname===''){
      alert('书名不能为空');
      return
    }
    let book = {
      name: this.state.bookname,
      author: localStorage.getItem('name'),
      description: this.state.description,
      datetime: new Date(),
      label: this.state.label
    };
    // alert(JSON.stringify(book));
    const res = await _addBook(book);
    if (res.data !== -1) {
      console.log(res.data)
      // window.location.reload();
    } else {
      alert(res.data);
    }
  }

  async handleDeleteBook(book) {
    let del = window.confirm("是否删除本书");
    if (!del) {
      return;
    }
    // 对象数组和普通数组不一样，splice 是左闭的，而普通数组是 左开的

    let index = this.state.booklist.indexOf(book);
    console.log(index);
    // console.log(this.state.booklist)
    this.state.booklist.splice(index , 1);

    this.setState({bookList: this.state.booklist});
    // console.log(this.state.booklist)
    const res = await _deleteBook(book.id);
    if (res.status !== 200) {
      alert(res.data);
    }

  }

  render() {
    let item;

    if (this.state.booklist === 'undefined' || this.state.booklist.length
        === 0) {
      item = <div>
        <h4>暂无作品</h4>

      </div>
    } else {
      item = <div>
        <BookList onDeleteBook={this.handleDeleteBook.bind(this)}
                  data={this.state.booklist}/>
      </div>
    }

    return (

        <div className="Content">
          <div style={this.state.style}></div>
          <div className='content-left'></div>
          <div className="content-middle">

            写一本新书: 书名应在15字以内
            <br/>

            <Form.Control type="text"
                          onChange={this.handleNameChange}
                          placeholder="书名"
                          value={this.state.bookname}
                          name="bookname"/>
            <br/>

            <Row>
              <Col>
                封面:
                <Form.Control type="file" accept="image/png, image/jpg"
                              onChange={this.handleFile}/>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>选择一个标签: </Form.Label>
                  <Form.Control as="select" onChange={this.handleLabelChange}>
                    <option>...</option>
                    <option>前端</option>
                    <option>后端</option>
                    <option>云计算</option>
                    <option>大数据</option>
                    <option>Android</option>
                    <option>数据库</option>
                    <option>其他</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {/*封面:*/}
            {/*<Form.Control type="file" accept="image/png, image/jpg"*/}
            {/*onChange={this.handleFile}/>*/}
            关于本书你想说些啥呢？
            <textarea className="Textarea_write"
                      onChange={this.handleDesChange}
                      value={this.state.description}
                      name="bookname"
                      placeholder="序言"
            />
            <Button variant="success"
                    onClick={this.handleSubmit}>保存</Button>
            <br/>
            <br/>
            you writing before:
            <hr/>
            {item}
          </div>

          <Route path="/write/:chaptername"
                 component={ManageBook}/>

        </div>
    );
  }
}

Write = HigherLogin(Write);
export default Write;
