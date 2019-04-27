import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {ListGroupItem,Button} from "react-bootstrap";
import '../../css/main.css'
import Time from "../Time";


class BookInfo extends Component {


  handleDelete(){
    // console.log(this.props.data)
    this.props.onDeleteBook(this.props.data);
  }

  render() {
    let param = {
      author: this.props.data.author,
      bookid: this.props.data.id,
    };
    const des = {
      description: this.props.data.description
    };
    param = JSON.stringify(param);
    let path = `/read/${param}`;  //传参数过去

    let item=undefined;
    if(typeof (this.props.onDeleteBook) !=="undefined"){
      item= <Button style={{marginLeft:"20%"}} variant="outline-danger" onClick={this.handleDelete.bind(this)}>删除</Button>
    }
    return (
        <div className="BookItem">
          <ListGroupItem variant="none">
            <div className="BookInfo">
              <span>书籍编号：</span>{this.props.data.id}
              {item}
              <br/>
              <NavLink to={{
                pathname: `${path}`,
                state: {des}
              }}>
                {this.props.data.name}
              </NavLink>
              <div className="Author">
                {this.props.data.author}<span> 编著</span>
              </div>
              {/*{this.props.data.description}*/}
              <br/>

              <span>更新时间：</span> <Time data={this.props.data.datetime}/>

              {/*{this.props.data.photourl}*/}
              <div className="Love">
                <span>点赞：</span> {this.props.data.love}
              </div>
            </div>
            {/*<div className="BookPhoto">*/}
            {/*<Figure>*/}
            {/*<Figure.Image*/}
            {/*width={80}*/}
            {/*height={100}*/}
            {/*alt="80x100"*/}
            {/*src={logo}*/}
            {/*/>*/}
            {/*</Figure>*/}
            {/*</div>*/}
          </ListGroupItem>
        </div>
    );
  }
}

export default BookInfo;
