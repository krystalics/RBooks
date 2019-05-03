import React, {Component} from 'react';
import Information from "./Information";
import '../../css/mypage.css'
import UserList from "./UserList";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import BookList from "../book/BookList";

class Page extends Component {

  render() {

    return (
        <div className="Content">
          <div className="content-left"></div>
          <div className="content-middle">
            <Information data={this.props.data.information}/>


            <Tabs defaultActiveKey="write">
              <Tab eventKey="write" title="作品集">
                <BookList data={this.props.data.bookList_write}/>
              </Tab>
              <Tab eventKey="love" title="书单">
                <BookList data={this.props.data.bookList_follow}/>
              </Tab>
              <Tab eventKey="focus" title="关注">
                <UserList data={this.props.data.userList_follow}/>
              </Tab>
              <Tab eventKey="befollowed" title="被关注">
                <UserList data={this.props.data.userList_be_followed}/>
              </Tab>
            </Tabs>

          </div>
          <div className="content-right"></div>

        </div>
    );
  }
}

export default Page;
