import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/comment.css'
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {checkCookie} from "../CookieService";

class CommentInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      datetime: ''
    }
  }


  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit(e) {  //把onSubmit 提到父组件中是为了及时更新列表
    if (checkCookie()) {
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
          <InputGroup className="mb-2">
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