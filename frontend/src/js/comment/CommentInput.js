import React,{Component} from 'react';
import PropTypes from 'prop-types';


class CommentInput extends Component{

  static propTypes={
    onSubmit: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state={ //由这两个加上 bookid chaptername commentuser 就是一个Comment对象
      content:'',
      datetime:''
    }
  }

  componentDidMount() {
    this.textarea.focus(); //当组件挂载之后，聚焦于 textarea
  }



  // 第三版新增
  handleContentChange(e){
    this.setState({
      content:e.target.value
    })
  }

  handleSubmit(e){
    if(this.props.onSubmit){  //判断是否传入了 onSubmit 属性，有的话就调用该函数
      var {content,datetime}=this.state;
      datetime=new Date().toLocaleDateString()+" : "+new Date().toLocaleTimeString();
      this.props.onSubmit({content,datetime});
    }
    // 现在 comment 包括  content ,createdTime
    this.setState({content:''}) //重新将评论内容设置为空
  }

  render() {
    return (
        <div className="comment-input">

          <div className="comment-field">
            <div className="comment-field-name">评论内容: </div>
            <div className="comment-field-input">
              <textarea
                  ref={(textarea)=>this.textarea=textarea}
                  value={this.state.content}
                  onChange={this.handleContentChange.bind(this)}/>
            </div>
          </div>

          <div className="comment-field-button">
            <button onClick={this.handleSubmit.bind(this)}>
              发布
            </button>
          </div>


        </div>
    );
  }
}


export default CommentInput