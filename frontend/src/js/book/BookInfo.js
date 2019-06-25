import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {ListGroupItem, Button} from "react-bootstrap";
import '../../css/main.css'
import Time from "../Time";

class BookInfo extends Component {

  handleDelete() {
    this.props.onDeleteBook(this.props.data);
  }

  handleInfoStore(){
    localStorage.setItem("currentBookId",this.props.data.id);
    localStorage.setItem("currentBookAuthor",this.props.data.author);
    localStorage.setItem("currentBookDes",this.props.data.description);
    localStorage.setItem("currentBookName",this.props.data.name);
  }


  render() {
    // let param = {
    //   author: this.props.data.author,
    //   bookid: this.props.data.id,
    // };
    // const des = {
    //   description: this.props.data.description
    // };
    // param = JSON.stringify(param);
    let path = `/read/${this.props.data.name}`;  //传参数过去

    let item = undefined;
    if (typeof (this.props.onDeleteBook) !== "undefined") {
      item = <Button style={{marginLeft: "5px", display: "inline"}}
                     variant="outline-danger"
                     onClick={this.handleDelete.bind(this)}>删除</Button>
    }
    return (
        <div className="BookItem">
          <ListGroupItem variant="none">
            <div className="BookInfo">
                <NavLink to={{
                  pathname: `${path}`
                }}>
                  <Button variant="link" onClick={this.handleInfoStore.bind(this)}>
                  {this.props.data.name}
                  </Button>

                </NavLink>
              <div className="Author">
                {this.props.data.author}<span> 编著</span>

              </div>
              {item}
              <br/>

              <span>更新时间：</span> <Time data={this.props.data.datetime}/>

              <div className="Love">
                <span>点赞：</span> {this.props.data.love}
              </div>

            </div>

          </ListGroupItem>
        </div>
    );
  }
}

export default BookInfo;
