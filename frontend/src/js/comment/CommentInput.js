import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../css/comment.css'
import {InputGroup,FormControl,Button }from "react-bootstrap";

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

  handleSubmit(e) {
    if (this.props.onSubmit) {  //判断是否传入了 onSubmit 属性，有的话就调用该函数
      var {content, datetime} = this.state;
      datetime = new Date().toLocaleDateString() + " : "
          + new Date().toLocaleTimeString();
      this.props.onSubmit({content, datetime});
    }
    // 现在 comment 包括  content ,createdTime
    this.setState({content: ''}) //重新将评论内容设置为空
  }

  render() {
    return (
        <div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="评论"
              aria-label="评论"
              aria-describedby="basic-addon2"
              />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.handleSubmit.bind(this)}>提交</Button>
            </InputGroup.Append>
          </InputGroup>

          {/*<div className="comment-field">*/}
              {/*<textarea*/}
                  {/*ref={(textarea) => this.textarea = textarea}*/}
                  {/*value={this.state.content}*/}
                  {/*onChange={this.handleContentChange.bind(this)}/>*/}
          {/*</div>*/}

          {/*<div className="comment-field-button">*/}
            {/*<button onClick={this.handleSubmit.bind(this)}>*/}
              {/*发布*/}
            {/*</button>*/}
          {/*</div>*/}


        </div>
    );
  }
}

export default CommentInput