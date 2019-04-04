import React, {Component} from 'react';
import '../../css/mypage.css'
import {ListGroupItem} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class User extends Component {

  render() {
    // const data={...this.props.state};
    // console.log(data);
    // console.log(this.props.location.state);
    const data = {...this.props.data};
    // console.log(this.props);
    return (
        <div className="user">
          <NavLink to={`/otheruser/${data.id}`}>
            <ListGroupItem action variant="light">
              {data.name}
            </ListGroupItem>
          </NavLink>
        </div>
    );
  }
}

export default User;
