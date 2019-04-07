import React, {Component} from 'react';
import '../../css/mypage.css'
import {ListGroupItem} from "react-bootstrap";

class User extends Component {

  render() {
    // const data={...this.props.state};
    // console.log(data);
    // console.log(this.props.location.state);
    const data = {...this.props.data};
    // console.log(this.props);
    return (
        <div className="user">

            <ListGroupItem action variant="light">
              {data.name}
            </ListGroupItem>

        </div>
    );
  }
}

export default User;
