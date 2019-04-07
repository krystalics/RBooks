import React, {Component} from 'react';
import Information from "./Information";
import '../../css/mypage.css'
import UserList from "./UserList";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BookList from "../book/BookList";

// import NavLink from "react-bootstrap/NavLink";

class Page extends Component {

  render() {
    // console.log(this.props);
    return (
        <div>
          <Information data={this.props.data.information}/>

          {/*<div className="nav">*/}
            {/*<Nav.Item>*/}
              {/*<NavLink to={{*/}
                {/*pathname: `/${this.props.param}/write`,*/}
                {/*state: this.props.data.bookList_write*/}
              {/*}}>作品集</NavLink>*/}
            {/*</Nav.Item>*/}
            {/*<Nav.Item>*/}
              {/*<NavLink to={{*/}
                {/*pathname: `/${this.props.param}/reading`,*/}
                {/*state: this.props.data.bookList_follow*/}
              {/*}}>书单</NavLink>*/}
            {/*</Nav.Item>*/}
            {/*<Nav.Item>*/}
              {/*<NavLink to={{*/}
                {/*pathname: `/${this.props.param}/follow`,*/}
                {/*state: this.props.data.userList_follow*/}
              {/*}}>关注</NavLink>*/}
            {/*</Nav.Item>*/}
            {/*<Nav.Item>*/}
              {/*<NavLink to={{*/}
                {/*pathname: `/${this.props.param}/befollowed`,*/}
                {/*state: this.props.data.userList_be_followed*/}
              {/*}}>被关注</NavLink>*/}
            {/*</Nav.Item>*/}
          {/*</div>*/}
          {/*<hr/>*/}


          <div className="content">
            {/*<BrowserRouter>*/}
            {/*<Switch>*/}
              {/*<Route path={`/${this.props.param}/write`}*/}
                     {/*component={Book}/>*/}
              {/*<Route path={`/${this.props.param}/reading`}*/}
                     {/*component={Book}/>*/}
              {/*<Route path={`/${this.props.param}/follow`}*/}
                     {/*component={UserList}/>*/}
              {/*<Route path={`/${this.props.param}/befollowed`}*/}
                     {/*component={UserList}/>*/}
            {/*</Switch>*/}
            <Tabs defaultActiveKey="write">
              <Tab eventKey="write" title="作品集">
               <BookList data={this.props.data.bookList_write}/>
              </Tab>
              <Tab eventKey="love" title="书单">
                <BookList data={this.props.data.bookList_follow}/>

              </Tab>
              <Tab eventKey="focus" title="关注" >
                {console.log(this.props.data)}
                <UserList data={this.props.data.userList_follow}/>
              </Tab>
              <Tab eventKey="befollowed" title="被关注" >
                <UserList data={this.props.data.userList_be_followed}/>
              </Tab>
            </Tabs>
            {/*</BrowserRouter>*/}
          </div>

        </div>
    );
  }
}


export default Page;
