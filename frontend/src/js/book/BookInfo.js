import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import '../../css/main.css'
import Time from "../Time";

class BookInfo extends Component {

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
    return (
        <div className="BookItem">
          <ListGroupItem variant="light" action>
            <div className="BookInfo">
              <span>书籍编号：</span>{this.props.data.id}
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
