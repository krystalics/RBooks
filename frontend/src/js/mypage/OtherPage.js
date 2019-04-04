import React, {Component} from 'react';
import axios from "axios";
import Page from "./Page";

var id = '';

class OtherPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    id = {...this.props.match.params.id};
    id = id[0];
    console.log(id)
    axios.get(`http://localhost:8080/mypage?userid=${id}`)
    .then(res => {
      // alert(JSON.stringify(res.data)); 有数据
      this.setState({data: res.data});

    }).catch(res => {
      this.setState({data: res.data})
    })
  }

  render() {
    // console.log(this.props.match.params);
    // console.log(this.state.data);
    return (
        <Page param="otheruser" data={this.state.data}/>
    );
  }
}


export default OtherPage;
