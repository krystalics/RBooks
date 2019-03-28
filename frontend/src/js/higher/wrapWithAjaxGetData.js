import React, { Component } from 'react'
import axios from 'axios';
export default (WrappedComponent, url) => {
  class NewComponent extends Component {
    constructor () {
      super();
      this.state = { data: null }
    }

    componentWillMount () {
     axios.get('http://localhost:8080/' + url)
      .then(res=>{
        this.setState({data:JSON.stringify(res.data)});
      }).catch(res=>{
        alert("加载错误")
     })
    }

    render () {
      return <WrappedComponent data={this.state.data} />
    }
  }
  return NewComponent
}