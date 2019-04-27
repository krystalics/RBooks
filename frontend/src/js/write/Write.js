import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../../css/main.css'
import axios from 'axios'
import BookList from "../book/BookList";

// 最终由 Navigator Content Footer 三个组件构成
class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname: '',
      description: '',
      booklist: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    axios.get(
        `http://localhost:8080/write/getwrite?author=${localStorage.getItem(
            'name')}`)
    .then(res => {
      this.setState({booklist: res.data})
    }).catch(err => {
      alert(err.data);
    })
  }

  handleNameChange(e) {
    this.setState({bookname: e.target.value})
  }

  handleChange(e) {
    this.setState({description: e.target.value})

  }

  handleSubmit() {
    // id photourl love  都不填
    let book = {
      name: this.state.bookname,
      author: localStorage.getItem('name'),
      description: this.state.description,
      datetime: new Date()
    };

    axios.post("http://localhost:8080/write/addbook", book)
    .then(res => {
      if (res.data !== -1) {
        alert("添加成功");
        window.location.reload();
      }

    })
    .catch(err => {
      alert(err.data)
    })

  }

  handleDeleteBook(book){
    let del=window.confirm("是否删除本书");
    if(!del){
      return;
    }

    console.log(book);
    let index=this.state.booklist.indexOf(book);
    this.state.booklist.splice(index-1,1);
    this.setState({bookList:this.state.booklist});

    axios.get(`http://localhost:8080/write/deletebook?bookid=${book.id}`)
    .then(res=>{

    }).catch(err=>{
      alert(err.data);
    })

  }

  render() {
    let item;
    // console.log(this.state.booklist);
    if(this.state.booklist==='undefined'||this.state.booklist.length===0){
      item=<div>
        <h4>作品集: ></h4>

      </div>
    }else{
      item= <div>
        <h4>作品集</h4>
        <BookList onDeleteBook={this.handleDeleteBook.bind(this)} data={this.state.booklist}/>
      </div>
    }

    return (
        <div className="wrap_write">
          {item}
          <div>
            开始一本新书:
            <br/>
            <Form.Label>书名：</Form.Label>
            <Form.Control type="text"
                          onChange={this.handleNameChange}
                          value={this.state.bookname}
                          name="bookname"/>
            <Form.Label>书本介绍：</Form.Label>
            <br/>
            <textarea className="Textarea"
                      onChange={this.handleChange}
                      value={this.state.description}
                      name="bookname"
                      placeholder="关于本书你想说些啥呢？"
            />
            <br/>
            <Button variant="success" onClick={this.handleSubmit}>保存</Button>
          </div>

        </div>
    );
  }
}

Write = HigherLogin(Write);
export default Write;
