import React, {Component} from 'react';
import {Pagination} from "react-bootstrap";
import {_getHot, _getNew} from '../api'

class Pagenate extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    this.handleHot();

  }

  handleSearchChange(e) {

    this.setState({search: e.target.value});
    if (e.target.value === "") { //当输入框中为空时，恢复原先的数据,搜索次数恢复为0
      this.setState({data: this.state.oldData,count:0});

    }
  }


  async handleHot() {

    const res = await _getHot();

  }

  async handleNew() {

    const res = await _getNew();

  }

  render() {
    return (
          <Pagination className="pagenation">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item >{4}</Pagination.Item>
            <Pagination.Item>{5}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
    );
  }
}

export default Pagenate;
