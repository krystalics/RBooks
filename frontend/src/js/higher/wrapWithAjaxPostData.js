import React, {Component} from 'react'
import axios from 'axios';

export default (WrappedComponent, url, data) => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = {data: null}
    }

    componentWillMount() {
      axios.post('http://localhost:8080/' + url,data)
      .then(res => {
        if (res.data === '') {
          this.setState({data: "加载错误"});
        }
        this.setState({data: JSON.stringify(res.data)});
      })
    }

    render() {
      return <WrappedComponent data={this.state.data}/>
    }
  }

  return NewComponent
}