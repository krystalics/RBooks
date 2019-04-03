import React, {Component} from 'react';
import ReactJSON from 'react-json-view'
import CommentList from "../comment/CommentList";
import CommentApp from "../comment/CommentApp";
import wrapWithAjaxPostData from "../higher/wrapWithAjaxPostData";
import axios from "axios";

var chapterid = {};

class MainContent extends Component {

  constructor(props) {
    super(props);

    // console.log(chapterid)
    this.state = {
      data: '',
      bookid: '',
      chaptername: '',
      commentuser: '',
      content: '',
      datetime: ''
    }
  }

  componentWillMount(){
   
    this.getData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let chaptername=prevProps.match.params.chaptername;
    let newChaptername=this.props.match.params.chaptername;
    if(chaptername!==newChaptername) this.getData();
  }

  getData() {
    chapterid = {
      bookid: JSON.parse(this.props.match.params.param).bookid,
      chaptername: this.props.match.params.chaptername
    };
    // console.log(chapterid);
    axios.post('http://localhost:8080/read/getchapter', chapterid)
    .then(res => {
      this.setState({data: res.data});
      this.analyse();
    }).catch(res => {
      this.setState({data: "加载错误"});
    });
    // console.log(this.props);

  }

  analyse() {
    const data = this.state.data;
    this.setState({
      bookid: data.chapterid.bookid,
      chaptername: data.chapterid.chaptername,
      author: JSON.parse(this.props.match.params.param).author,
      content: data.content,
      datetime: data.datetime
    })
  }

  render() {

    return (
        <div>
          <div className="title">
            <h3>{this.state.chaptername}</h3>
            <h5>{this.state.author}</h5>
            <h5>{this.state.datetime}</h5>
          </div>

        </div>
    );
  }
}

// MainContent = wrapWithAjaxPostData(MainContent,'read/getchapter',chapterid);

export default MainContent;
