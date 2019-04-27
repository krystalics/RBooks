import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/comment.css'
import {Button, FormControl, InputGroup} from "react-bootstrap";

class CommentInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { //由这两个加上 bookid chaptername commentuser 就是一个Comment对象
      content: '',
      datetime: ''
    }
  }

  componentDidMount() {
    // this.FormControl.focus(); //当组件挂载之后，聚焦于 textarea
  }

  // 第三版新增
  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  checkCookie() {
    let userid = this.getCookie("userid");
    return !(userid === null || userid === -1);
    //默认是-1  而无该key 则为''
  }

  handleSubmit(e) {  //把onSubmit 提到父组件中是为了及时更新列表
    if (this.checkCookie()) {
      if (this.props.onSubmit) {  //判断是否传入了 onSubmit 属性，有的话就调用该函数
        let {content, datetime} = this.state;
        datetime = new Date().getTime();
        this.props.onSubmit({content, datetime});
      }

      this.setState({content: ''}); //重新将评论内容设置为空
    } else {
      alert("请先登录！");
    }
  }

  render() {
    return (
        <div>
          <InputGroup className="mb-3">
            <FormControl as="textarea"
                placeholder="评论"
                aria-label="评论"
                value={this.state.content}
                onChange={this.handleContentChange.bind(this)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary"
                      onClick={this.handleSubmit.bind(this)}>提交</Button>
            </InputGroup.Append>
          </InputGroup>


        </div>
    );
  }
}

export default CommentInput