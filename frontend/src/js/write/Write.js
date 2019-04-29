import React, {Component} from 'react';
import HigherLogin from "../higher/HigherLogin";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import '../../css/main.css'
import BookList from "../book/BookList";
import {_addBook, _deleteBook, _getWrite} from '../api'

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
    this.getData();
  }

  async getData(){
    const res=await _getWrite(localStorage.getItem('name'));
    if(res.status===200){
      this.setState({booklist: res.data})
    }else {
      alert(res.data);
    }
  }

  handleNameChange(e) {
    this.setState({bookname: e.target.value})
  }

  handleChange(e) {
    this.setState({description: e.target.value})

  }

  async handleSubmit() {
    // id photourl love  都不填
    let book = {
      name: this.state.bookname,
      author: localStorage.getItem('name'),
      description: this.state.description,
      datetime: new Date()
    };

    const res=await _addBook(book);
    if (res.data !== -1) {
      window.location.reload();
    }else {
      alert(res.data);
    }
  }

 async handleDeleteBook(book) {
    let del = window.confirm("是否删除本书");
    if (!del) {
      return;
    }
    console.log(book);
    let index = this.state.booklist.indexOf(book);
    this.state.booklist.splice(index - 1, 1);
    this.setState({bookList: this.state.booklist});

    const res=await _deleteBook(book.id);
    if(res.status!==200){
      alert(res.data);
    }

  }

  render() {
    let item;

    if (this.state.booklist === 'undefined' || this.state.booklist.length
        === 0) {
      item = <div>
        <h4>作品集: ></h4>

      </div>
    } else {
      item = <div>
        之前的作品集
        <BookList onDeleteBook={this.handleDeleteBook.bind(this)}
                  data={this.state.booklist}/>
      </div>
    }

    return (
        <div className="wrap_write">
          {item}
          <div>
            开始一本新书
            <br/>
            <InputGroup>
              <Form.Control type="text"
                            onChange={this.handleNameChange}
                            placeholder="书名"
                            value={this.state.bookname}
                            name="bookname"/>
              <InputGroup.Append>
                <Button variant="success"
                        onClick={this.handleSubmit}>保存</Button>
              </InputGroup.Append>
            </InputGroup>

            <textarea className="Textarea_write"
                      onChange={this.handleChange}
                      value={this.state.description}
                      name="bookname"
                      placeholder="关于本书你想说些啥呢？"
            />
            <br/>
          </div>

        </div>
    );
  }
}

Write = HigherLogin(Write);
export default Write;
