import React, {Component} from 'react';

import '../../css/main.css'
import {ListGroup} from "react-bootstrap";
import axios from 'axios'

// 这个组件渲染  关注，收藏 到顶端，
class ReadSideBar extends Component {

  constructor(props) {
    super(props);
    this.state = { //默认都是没有收藏，关注
      followauthor: "关注作者",
      followbook: "点赞收藏"
    };
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
    this.handleFollowBook = this.handleFollowBook.bind(this);
    this.handleTop=this.handleTop.bind(this);
  }

  componentWillMount() {
    //需要先获得是否有关注或者收藏
    let followbookid = {
      bookid: this.props.id,
      userid: localStorage.getItem('userid')
    };

    axios.post("http://localhost:8080/read/isfollowbook", followbookid)
    .then(res => {
      if (res.data) { //如果已经点赞过了
        this.setState({followbook: "取消点赞"});
      }else{
        this.setState({followbook: "点赞收藏"});
      }
    }).catch(err => {
      alert(err.data);
    });

    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.props.author
    };
    axios.get(
        `http://localhost:8080/read/isfollowauthor?userid=${param.userid}&authorname=${param.authorname}`)
    .then(res => {
      if(res.data){
        this.setState({followauthor: "取消关注"});
      }else{
        this.setState({followauthor: "关注作者"});
      }
    }).catch(err => {
      alert(err.data);
    })
  }

  handleFollowBook() { //需要bookid 和 userid
    // axios.post();
    if (typeof (this.props.id) === "undefined" || localStorage.getItem(
        'userid')
        === "undefined") {
      return;
    }
    let followbookid = {
      bookid: this.props.id,
      userid: localStorage.getItem('userid')
    };
    if (this.state.followbook === "点赞收藏") {
      axios.post("http://localhost:8080/read/addfollowbook", followbookid)
      .then(res => {
        //点赞之后变更显示
        this.setState({followbook: "取消点赞"});
        alert("收藏成功")
      }).catch(err => {
        alert("收藏失败" + err.data);
      })
    } else {
      axios.post("http://localhost:8080/read/deletefollowbook", followbookid)
      .then(res => {
        this.setState({followbook: "点赞收藏"});
        alert("取消成功")
      }).catch(err => {
        alert("取消失败" + err.data);
      })
    }

  }

  handleFollowAuthor() { //需要authorid 和 userid
    if (typeof (this.props.author) === "undefined" || localStorage.getItem(
        'userid') === "undefined") {
      return;
    }
    let param = {
      userid: localStorage.getItem('userid'),
      authorname: this.props.author
    };
    if (this.state.followauthor === "关注作者") {
      axios.get(
          `http://localhost:8080/read/addfollowauthor?userid=${param.userid}&authorname=${param.authorname}`)
      .then(res => {
        //点赞之后变更显示
        this.setState({followauthor: "取消关注"});
        alert("关注成功")
      }).catch(err => {
        alert("关注失败" + err.data);
      })
    } else {
      axios.get(
          `http://localhost:8080/read/deletefollowauthor?userid=${param.userid}&authorname=${param.authorname}`)
      .then(res => {
        //点赞之后变更显示
        this.setState({followauthor: "关注作者"});
        alert("取消成功")
      }).catch(err => {
        alert("取消失败" + err.data);
      })
    }
  }

  handleTop(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {

    return (
        <div className="sidebar_right">
          <ListGroup>
            <li onClick={this.handleFollowBook}><ListGroup.Item action
                                                                variant="info">{this.state.followbook}</ListGroup.Item>
            </li>
            <li onClick={this.handleFollowAuthor}><ListGroup.Item action
                                                                  variant="primary">{this.state.followauthor}</ListGroup.Item>
            </li>
            <li onClick={this.handleTop}><ListGroup.Item action variant="success">到顶部</ListGroup.Item>
            </li>

          </ListGroup>
        </div>
    )
        ;
  }
}

export default ReadSideBar;
