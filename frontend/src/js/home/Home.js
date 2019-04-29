import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import BookList from "../book/BookList";
import {_getHot, _getNew} from '../api'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      color1: 'link',
      color2: 'none',
      data: '暂无数据',
      oldData: '暂无数据',
      count:0  //记录一次搜索中的搜索次数
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

  handleSearch() {
    let {oldData} = this.state;
    let data = oldData.filter(item => {
      return item.name.indexOf(this.state.search) !== -1 || item.id
          === parseInt(this.state.search); //如果等于-1说明不在里面
    });

    this.setState({data: data,count:this.state.count+1});
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleSearch();
    }
  }

  async handleHot() {
    this.setState({color1: 'link', color2: 'none'});

    const res = await _getHot();
    this.setState({data: res.data, oldData: res.data});
  }

  async handleNew() {
    this.setState({color1: 'none', color2: 'link'});

    const res = await _getNew();
    this.setState({data: res.data, oldData: res.data});

  }

  render() {
    let item = <h5>第 {this.state.count} 次找不到数据</h5>;
    if (this.state.data.length > 0) {
      item = <BookList data={this.state.data}/>
    }


    return (
        <div>
          <div>
            <InputGroup>
              <FormControl placeholder="输入书名或者编号"
                           value={this.state.search}
                           onKeyUp={this.handleKeyUp.bind(this)}
                           onChange={this.handleSearchChange.bind(this)}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                        onClick={this.handleSearch.bind(this)}>搜索</Button>
              </InputGroup.Append>
            </InputGroup>
            <ButtonGroup>
              <Button variant={this.state.color1}
                      onClick={this.handleHot.bind(this)}>最热门</Button>

              <Button
                  variant={this.state.color2}
                  onClick={this.handleNew.bind(this)}>最新</Button>
            </ButtonGroup>
          </div>
          <hr/>

          {item}
        </div>

    );
  }
}

export default Home;
