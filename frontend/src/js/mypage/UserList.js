import React, {Component} from 'react';
import '../../css/mypage.css'
import User from "./User";
import {ListGroup} from "react-bootstrap";

class UserList extends Component {

  analyseData(){
    const data=this.props.data;

    if(typeof(data)=== "undefined"){
      return [];
    }
    let users=[];
    for(let item of data){
      // console.log(item)
      let temp={
        id:item.id,
        name:item.name
      };
      users.push(temp);
    }
    return users;
  }

  render() {

    return (
        <ListGroup>
          {this.analyseData().map((item,idx)=>{
            return <User data={item} key={idx}/>
          })}

        </ListGroup>
    );
  }
}

export default UserList;
