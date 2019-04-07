import React, {Component} from 'react';
import '../../css/mypage.css'
import User from "./User";
import {ListGroup} from "react-bootstrap";

class UserList extends Component {

  analyseData(){
    const data=this.props.data;
    // console.log(this.props);
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
    // const data={...this.props.state};
    // console.log(data);
    // const data={...this.props.location.state};
    // console.log(data);

    return (
        <ListGroup>
          {this.analyseData().map((item,idx)=>{
            // console.log(item);
            return <User data={item} key={idx}/>
          })}

        </ListGroup>
    );
  }
}

export default UserList;
