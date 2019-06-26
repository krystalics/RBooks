import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {ListGroupItem, Button} from "react-bootstrap";
import '../../css/main.css'
import Time from "../Time";

class BookInfo extends Component {

  handleDelete() {
    this.props.onDeleteBook(this.props.data);
  }

  handleInfoStore() {
    localStorage.setItem("currentBookId", this.props.data.id);
    localStorage.setItem("currentBookAuthor", this.props.data.author);
    localStorage.setItem("currentBookDes", this.props.data.description);
    localStorage.setItem("currentBookName", this.props.data.name);
  }

  handleEdit() {

    alert('edit')
  }

  decision(deleteButton, eLink, path) {
    if (typeof (this.props.onDeleteBook) !== "undefined") {
      deleteButton = <Button
          style={{position: "absolute", display: "inline", right: '5px'}}
          variant="danger"
          onClick={this.handleDelete.bind(this)}>删除</Button>;
      eLink = <Button
          variant="link"
          onClick={this.handleEdit.bind(this)}>
        <span className='limit-length' title={this.props.data.name}>{this.props.data.name}</span>


      </Button>
    } else {
      eLink = <NavLink to={{
        pathname: `${path}`
      }}>
        <Button variant="link" onClick={this.handleInfoStore.bind(this)}>
          <span className='limit-length' title={this.props.data.name}>{this.props.data.name}</span>
        </Button>
      </NavLink>
    }

    return {deleteButton, eLink}
  }

  render() {

    let path = `/read/${this.props.data.name}/序言`;  //传参数过去

    let deleteButton = undefined;
    let eLink = undefined;
    let obj = {
      deleteButton: '',
      eLink: ''
    };
    obj = this.decision(deleteButton, eLink, path);
    return (
        <div className="BookItem">
          <ListGroupItem variant="none">
            <div className="BookInfo">
              {obj.eLink}

              <div className="Author">
                <span
                    className='limit-length'>作者: {this.props.data.author}</span>
              </div>

              <span
                  style={{marginLeft: '15px'}}>标签: </span>{this.props.data.label}

              {obj.deleteButton}
              <br/>

              <span>更新时间: </span> <Time data={this.props.data.datetime}/>

              <div className="Love">
                <span>点赞: </span> {this.props.data.love}
              </div>

            </div>

          </ListGroupItem>
        </div>
    );
  }
}

export default BookInfo;
