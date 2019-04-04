import React, {Component} from 'react';
import Information from "./Information";
import Nav from "react-bootstrap/Nav";
import '../../css/mypage.css'
import {NavLink, Route, Switch} from "react-router-dom";
import UserList from "./UserList";
import Book from './Book'

// import NavLink from "react-bootstrap/NavLink";

class Page extends Component {

  render() {
    // console.log(this.props);
    return (
        <div>
          <Information data={this.props.data.information}/>


          <div className="nav">
            <Nav.Item>
              <NavLink to={{
                pathname: `/${this.props.param}/write`,
                state: this.props.data.bookList_write
              }}>作品集</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to={{
                pathname: `/${this.props.param}/reading`,
                state: this.props.data.bookList_follow
              }}>书单</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to={{
                pathname: `/${this.props.param}/follow`,
                state: this.props.data.userList_follow
              }}>关注</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to={{
                pathname: `/${this.props.param}/befollowed`,
                state: this.props.data.userList_be_followed
              }}>被关注</NavLink>
            </Nav.Item>
          </div>
          <hr/>


          <div className="content">
            {/*<BrowserRouter>*/}
            <Switch>
              <Route path={`/${this.props.param}/write`}
                     component={Book}/>
              <Route path={`/${this.props.param}/reading`}
                     component={Book}/>
              <Route path={`/${this.props.param}/follow`}
                     component={UserList}/>
              <Route path={`/${this.props.param}/befollowed`}
                     component={UserList}/>
            </Switch>
            {/*</BrowserRouter>*/}
          </div>


        </div>
    );
  }
}


export default Page;
